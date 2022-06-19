import {useTypedSelector} from "./useTypedSelector";
import {useActions} from "./useActions";
import {useEffect, useRef, useState} from "react";
import * as workerTimers from 'worker-timers'

const usePlayer = () => {
    const {
        id,
        path,
        author,
        cover,
        name,
        queue,
    } = useTypedSelector(s => s.player)
    const trackRef = useRef<HTMLAudioElement>(new Audio())
    const intervalRef = useRef<any>()
    const [dragging, setDragging] = useState(false)
    const [duration, setDuration] = useState(0)
    const [played, setPlayed] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [loading, setLoading] = useState(true)
    const {PlayerSetTrack} = useActions()
    const onLoadedMetadata = () => setDuration(trackRef.current.duration)
    const i = queue.findIndex(x => x.id === id)
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
            trackRef.current.onended = nextTrack
            setPlayed(trackRef.current.currentTime)
        }, 300)
    }

    const startTrack = () => {
        setLoading(false)
        startTimer()
        setPlaying(true)
        if ('mediaSession' in navigator) navigator.mediaSession.playbackState = "playing"
        document.title = `${author} - ${name}`
        trackRef.current.play()
    }

    const stopTrack = () => {
        setPlaying(false)
        trackRef.current.pause()
        document.title = `Serenity`
        if ('mediaSession' in navigator) navigator.mediaSession.playbackState = "paused"
        clearTimer()
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
        setLoading(true)
        if(path === '' || i < 0) return
        trackRef.current.onloadedmetadata = onLoadedMetadata
        trackRef.current.pause()
        trackRef.current.load()
        trackRef.current.onloadeddata = startTrack
        trackRef.current.onplay = startTrack
        trackRef.current.onpause = stopTrack
        if ('mediaSession' in navigator) navigator.mediaSession.setActionHandler('previoustrack', prevTrack);
        if ('mediaSession' in navigator) navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
    },[i, path])

    useEffect(() => {
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
    }, [name, author, cover])

    useEffect(() => {return () => {
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
        loading
    }
}

export default usePlayer