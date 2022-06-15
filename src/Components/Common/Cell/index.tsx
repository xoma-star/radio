import React from "react";
import './Cell.css'

interface props{
    children?: string | React.ReactNode,
    before?: React.ReactNode,
    className?: string,
    style?: React.CSSProperties,
    onClick?: (e: React.MouseEvent) => void,
    onDoubleClick?: (e: React.MouseEvent) => void
    selected?: boolean
}

const Cell = ({before, style, className, children, onClick, selected, onDoubleClick}: props) => {
    const clickHandler = (e: React.MouseEvent) => {
        e.stopPropagation()
        if(onClick) onClick(e)
    }
    return <div
        onClick={clickHandler}
        onDoubleClick={onDoubleClick}
        style={style}
        className={`cell ${className || ""}${selected && ' selected'}`}>
        {before}
        {children}
    </div>
}

export default Cell