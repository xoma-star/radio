import {useTypedSelector} from "./useTypedSelector";
import {useActions} from "./useActions";
import React, {useEffect, useRef, useState} from "react";
import * as workerTimers from 'worker-timers'
import {UI_Windows} from "../Redux/Reducers/ui";
import axios from "axios";
import {TRACK_DATA_LOCATION} from "../config";
import TrackService from "../http/Services/TrackService";

const usePlayer = () => {
    const {
        id,
        path,
        author,
        cover,
        name,
        queue,
        autoplay,
        random
    } = useTypedSelector(s => s.player)
    const trackRef = useRef<HTMLAudioElement>(new Audio())
    const intervalRef = useRef<any>()
    const [dragging, setDragging] = useState(false)
    const [duration, setDuration] = useState(0)
    const [played, setPlayed] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [loading, setLoading] = useState(true)
    const [volume, setVolume] = useState(1)
    const {PlayerSetTrack, UI_OpenWindow, PlayerAddQueue} = useActions()
    const onLoadedMetadata = () => setDuration(trackRef.current.duration)
    const i = queue.findIndex(x => x.id === id && x.random === random)
    const canPlayNext = i < queue.length - 1
    const canPlayPrev = i > 0

    const clearTimer = () => {
        if (intervalRef.current){
            workerTimers.clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    const startTimer = () => {
        clearTimer()
        intervalRef.current = workerTimers.setInterval(() => {
            if('mediaSession' in navigator) navigator.mediaSession.setPositionState({
                duration: trackRef.current.duration || 0,
                playbackRate: trackRef.current.playbackRate || 1,
                position: trackRef.current.currentTime || 0
            })
            setPlayed(trackRef.current.currentTime)
        }, 300)
    }

    const startTrack = () => {
        try{
            setLoading(false)
            startTimer()
            setPlaying(true)
            if ('mediaSession' in navigator) navigator.mediaSession.playbackState = "playing"
            document.title = `${author} - ${name}`
            trackRef.current.onended = nextTrack
            trackRef.current.play()
        }catch{}
    }

    const stopTrack = () => {
        try{
            setPlaying(false)
            trackRef.current.pause()
            document.title = `Serenity`
            if ('mediaSession' in navigator) navigator.mediaSession.playbackState = "paused"
            clearTimer()
        }catch{}
    }

    const onBarClick = (e: number) => {
        trackRef.current.currentTime = duration * e / 100
        setPlayed(duration * e / 100)
    }

    const onRatioUpdate = (e: number) => setPlayed(duration * e / 100)

    const onDragStart = () => {
        setDragging(true)
        clearTimer()
    }
    const onDragEnd = (e: number) => {
        setDragging(false)
        setPlayed(duration * e / 100)
        trackRef.current.currentTime = duration * e / 100
        startTimer()
    }

    const volumeHandler = (e: number) => setVolume(e / 100)
    useEffect(() => {trackRef.current.volume = volume}, [volume])

    const nextTrack = () => {
        if(!canPlayNext){
            trackRef.current.currentTime = 0
            setPlaying(false)
            setPlayed(0.01)
            return
        }
        trackRef.current.currentTime = 0
        PlayerSetTrack(queue[i + 1])
        setPlaying(true)
    }
    const prevTrack = () => {
        if(!canPlayPrev) return
        trackRef.current.currentTime = 0
        PlayerSetTrack(queue[i - 1])
        setPlaying(true)
    }

    useEffect(() => {
       try{
           setLoading(true)
           if(path === '' || i < 0) return
           trackRef.current.onloadedmetadata = () => {
               onLoadedMetadata()
               if(id) axios.get(TRACK_DATA_LOCATION + 'addListen', {params: {id}}).catch(() => {})
           }
           trackRef.current.onloadeddata = startTrack
           trackRef.current.onplay = startTrack
           trackRef.current.onpause = stopTrack
           trackRef.current.pause()
           trackRef.current.load()
           if ('mediaSession' in navigator) navigator.mediaSession.setActionHandler('previoustrack', prevTrack)
           if ('mediaSession' in navigator) navigator.mediaSession.setActionHandler('nexttrack', nextTrack)
       }catch{}
    },[path, i])

    useEffect(() => {
        if(window.location.pathname.split('/')[1] === UI_Windows.MUSIC_PLAYER) {
            if(!id) return
            window.history
                .replaceState({window: UI_Windows.MUSIC_PLAYER}, '', `/${UI_Windows.MUSIC_PLAYER}/${id}`)
        }
    }, [window.location.pathname])

    useEffect(() => {
        if(i === queue.length - 1 && autoplay && queue.length > 0){
            TrackService.getRandom(1).then(res => {
                PlayerAddQueue(res.data[0])
            })
        }
    }, [autoplay, i, path, queue])

    useEffect(() => {trackRef.current.onended = nextTrack}, [nextTrack])

    useEffect(() => {
        try{
            if ('mediaSession' in navigator) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: name || 'Unknown',
                    artist: author || 'Unknown',
                    artwork: [
                        { src: cover as string || '', sizes: '256x256', type: 'image/png' },
                        { src: cover as string || '', sizes: '512x512', type: 'image/png' }
                    ]
                });
            }
        }catch{}
    }, [name, author, cover])

    useEffect(() => { return () => {
        clearTimer()
        if('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata(undefined)
            navigator.mediaSession.setPositionState({})
        }
    }}, [])

    return {
        trackRef,
        played,
        duration,
        path,
        dragging,
        startTrack,
        stopTrack,
        onBarClick,
        onRatioUpdate,
        onDragEnd,
        onDragStart,
        nextTrack,
        prevTrack,
        playing,
        name,
        id,
        cover,
        author,
        canPlayNext,
        canPlayPrev,
        loading,
        openQueue: (e: React.MouseEvent) => {
            e.stopPropagation()
            UI_OpenWindow(UI_Windows.QUEUE)
        },
        volumeHandler
    }
}

export default usePlayer