import {useTypedSelector} from "./useTypedSelector";
import {useActions} from "./useActions";
import {useEffect, useRef, useState} from "react";

//TODO: когда сделаешь очередь сделай автовоспроизведение следующего трека в интервале

const usePlayer = () => {
    const {
        id,
        path,
        author,
        cover,
        name,
        queue,
        ts
    } = useTypedSelector(s => s.player)
    const trackRef = useRef<HTMLAudioElement>(new Audio())
    const intervalRef = useRef<any>()
    const [dragging, setDragging] = useState(false)
    const [duration, setDuration] = useState(0)
    const [played, setPlayed] = useState(0)
    const [playing, setPlaying] = useState(false)
    const {PlayerSetTrack} = useActions()
    const onLoadedMetadata = () => setDuration(trackRef.current.duration)
    const i = queue.findIndex(x => x.id === id && x.ts === ts)
    const canPlayNext = i < queue.length - 1
    const canPlayPrev = i > 0

    useEffect(() => {
        if(path === '') return
        trackRef.current.onloadedmetadata = onLoadedMetadata
        trackRef.current.pause()
        trackRef.current.load()
        if(trackRef.current.readyState >= 2) startTrack()
        else trackRef.current.onloadeddata = startTrack
        trackRef.current.onplay = startTrack
        trackRef.current.onpause = stopTrack
        trackRef.current.onended = nextTrack
    },[i, path])

    useEffect(() => {return () => clearInterval(intervalRef.current)}, [])

    const startTimer = () => {
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            setPlayed(trackRef.current.currentTime)
        }, 100)
    }

    const startTrack = () => {
        startTimer()
        setPlaying(true)
        trackRef.current.play()
    }

    const stopTrack = () => {
        setPlaying(false)
        trackRef.current.pause()
        clearInterval(intervalRef.current)
    }

    const onBarClick = (e: number) => {
        trackRef.current.currentTime = duration * e / 100
        setPlayed(duration * e / 100)
    }

    const onRatioUpdate = (e: number) => setPlayed(duration * e / 100)

    const onDragStart = () => {
        setDragging(true)
        clearInterval(intervalRef.current)
    }
    const onDragEnd = (e: number) => {
        setDragging(false)
        setPlayed(duration * e / 100)
        trackRef.current.currentTime = duration * e / 100
        startTimer()
    }

    const nextTrack = () => {
        if(i < 0 || i >= queue.length - 1 || queue.length < 1){
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
        if(i <= 0) return
        trackRef.current.currentTime = 0
        PlayerSetTrack(queue[i - 1])
        setPlaying(true)
    }

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
        canPlayPrev
    }
}

export default usePlayer