import {useTypedSelector} from "./useTypedSelector";
import {useEffect, useState} from "react";
import * as workerTimers from 'worker-timers'

const useSnowEffect = () => {
    const {isSnowing} = useTypedSelector(s => s.ui)
    const [current, setCurrent] = useState<{count: number, speed: [number, number], wind: [number, number], radius: [number, number], growing: boolean}>({
        count: 100,
        speed: [0, 0],
        wind: [0, 0],
        radius: [0.1, 1],
        growing: true
    })
    useEffect(() => {
        const interval = workerTimers.setInterval(() => {
            setCurrent(s => ({
                count: isSnowing ?
                    Math.min(Math.max(s.count + Math.random() * 5 * (s.growing ? 1 : -1), 100), 750) :
                    Math.max(s.count - 1, 0),
                speed: [0, s.count / 75],
                radius: [0.5, 2],
                wind: [-s.count / 75, s.count / 75],
                growing: Math.random() > 0.95 ? !s.growing : s.growing
            }))
        }, isSnowing ? 1000 : 100)

        return () => workerTimers.clearInterval(interval)
    }, [isSnowing])

    return current
}

export default useSnowEffect