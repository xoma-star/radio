import {useTypedSelector} from "./useTypedSelector";
import {useActions} from "./useActions";
import React, {useState} from "react";
import {UI_Windows} from "../Redux/Reducers/ui";

const useWindow = (id: UI_Windows) => {
    const {opened, minimized, layoutPos} = useTypedSelector(s => s.ui)
    let display = opened.indexOf(id) < 0 ? {display: 'none'} : {}
    const {UI_SetActiveWindow} = useActions()
    const [pos, setPos] = useState({x: 100, y: 300})
    const [isDragging, setIsDragging] = useState(false)
    const style = {...display, '--x': `${pos.x}px`, '--y': `${pos.y}px`, '--to': `${opened.indexOf(id) * window.screen.width / 10 + 56}px`} as unknown as React.CSSProperties
    style.zIndex = layoutPos[id]

    const onDrag = (e:any) => setPos({x: e.clientX, y: e.clientY})
    const onStart = () => {
        setIsDragging(true)
        UI_SetActiveWindow(id)
    }
    const onStop = () => {setIsDragging(false)}
    const onClick = () => UI_SetActiveWindow(id)

    return {
        className: `window ${minimized[id] ? 'minimizing' : 'unminimizing'} ${isDragging ? 'dragging' : ''}`,
        pos,
        onDrag,
        onStart,
        onStop,
        style,
        onClick
    }
}

export default useWindow