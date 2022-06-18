import React from "react";
import './List.css'

interface props{
    children?: React.ReactNode,
    className?: string,
    style?: React.CSSProperties,
    onDrop?: (e: React.DragEvent) => void,
    onDragOver?: (e: React.DragEvent) => void
}

const List = ({children, className, style, onDrop, onDragOver}: props) => {
    return <div
        onDragOver={onDragOver}
        onDrop={onDrop}
        style={style}
        className={`list${className ? ` ${className}` : ''}`}>{children}</div>
}

export default List