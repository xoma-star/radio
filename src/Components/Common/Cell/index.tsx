import React from "react";
import './Cell.css'

interface props{
    children?: string | React.ReactNode,
    before?: React.ReactNode,
    className?: string,
    style?: React.CSSProperties,
    onClick?: (e: React.MouseEvent) => void
}

const Cell = ({before, style, className, children, onClick}: props) => {
    const clickHandler = (e: React.MouseEvent) => {
        e.stopPropagation()
        if(onClick) onClick(e)
    }
    return <div
        onClick={clickHandler}
        style={style}
        className={`cell${className ? ` ${className}` : ''}`}>
        {before}
        {children}
    </div>
}

export default Cell