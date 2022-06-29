import {useTypedSelector} from "./useTypedSelector";
import {useActions} from "./useActions";
import React, {useEffect, useState} from "react";
import {UI_Windows} from "../Redux/Reducers/ui";

const useWindow = (id: UI_Windows) => {
    const {opened, minimized, layoutPos} = useTypedSelector(s => s.ui)
    const [contentHidden, setContentHidden] = useState(false)
    let display = opened.indexOf(id) < 0 ? {display: 'none'} : {}
    const {UI_SetActiveWindow} = useActions()
    const [pos, setPos] = useState({
        x: window.innerWidth > 400 ? 100 + 30 * opened.length : 2,
        y: window.innerWidth > 400 ? 60 + 30 * opened.length : 80 + 15 * opened.length
    })
    const [isDragging, setIsDragging] = useState(false)
    const style = {...display, '--to': `${opened.indexOf(id) * (window.innerWidth > 400 ? 210 : 31)}px`} as unknown as React.CSSProperties
    style.zIndex = layoutPos[id]

    useEffect(() => {
        if(minimized[id]) setContentHidden(true)
        else setTimeout(() => setContentHidden(false), 200)
    }, [minimized[id]])

    const onDrag = (e:any) => setPos({x: e.clientX, y: e.clientY})
    const onStart = () => {
        setIsDragging(true)
        UI_SetActiveWindow(id)
    }
    const onStop = () => {setIsDragging(false)}
    const onClick = () => UI_SetActiveWindow(id)

    return {
        className: `window ${minimized[id] ? 'minimizing' : 'unminimizing'}${isDragging ? ' dragging' : ''}${contentHidden ? ' content-hidden' : ''}`,
        pos,
        onDrag,
        onStart,
        onStop,
        style,
        onClick
    }
}

export default useWindow