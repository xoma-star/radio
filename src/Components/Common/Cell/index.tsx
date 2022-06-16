import React from "react";
import './Cell.css'

interface props{
    children?: string | React.ReactNode,
    before?: React.ReactNode,
    className?: string,
    style?: React.CSSProperties,
    onClick?: (e: React.MouseEvent) => void,
    onDoubleClick?: (e: React.MouseEvent) => void
    selected?: boolean,
    after?: React.ReactNode
}

const Cell = ({before, style, className, children, onClick, selected, onDoubleClick, after}: props) => {
    const clickHandler = (e: React.MouseEvent) => {
        e.stopPropagation()
        if(onClick) onClick(e)
    }
    return <div
        onClick={clickHandler}
        onDoubleClick={onDoubleClick}
        style={style}
        className={`cell${className || ""}${selected ? ' selected' : ''}`}>
        <div className={'before'}>{before}</div>
        <div className={'body'}>{children}</div>
        <div className={'after'}>{after}</div>
    </div>
}

export default Cell