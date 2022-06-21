import Draggable from "react-draggable";
import React, {useEffect, useRef, useState} from "react";
import './DragBar.css'

interface props{
    onBarClick?: (e: number) => void,
    onDragStart?: () => void,
    onDragEnd?: (e: number) => void,
    pos?: number,
    onRatioUpdate: (e: number) => void
}

const DragBar = ({onBarClick, pos, onDragEnd, onDragStart, onRatioUpdate}: props) => {
    const ref = useRef<any>(null)
    const [width, setWidth] = useState(0)
    const [pointer, setPointer] = useState(pos ? pos : 0)
    const ratio = pointer / width * 100
    useEffect(() => {if(pos) setPointer(pos / 100 * width <= width ? pos / 100 * width : 0)}, [pos])
    useEffect(() => {
        setWidth(ref.current?.clientWidth)
    }, [ref.current?.clientWidth])

    return <div className={'dragbar'}>
        <div
            className={'line-bigger'}
            onClick={(e) => {
                //@ts-ignore
                let rect = e.target.getBoundingClientRect();
                let x = e.clientX - rect.left; //x position within the element.
                // let y = e.clientY - rect.top;  //y position within the element.
                setPointer(x)
                if(onBarClick) onBarClick(x / width * 100)
            }}
            ref={ref}
        >
            <div
                className={'line'}
                style={{'--fill': `${ratio}%`} as React.CSSProperties}
            />
        </div>
        <Draggable
            onStart={onDragStart}
            grid={[5, 0]}
            onStop={() => {if(onDragEnd) onDragEnd(ratio)}}
            bounds={{left: 0, right: width}}
            onDrag={(e:any, data) => {
                setPointer(data.x)
                onRatioUpdate(ratio)
            }}
            position={{x: pointer, y: 0}}
            axis={'x'}>
            <div className={'line-controller'}/>
        </Draggable>
    </div>
}

export default DragBar