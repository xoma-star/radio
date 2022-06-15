import React from "react";
import './List.css'

interface props{
    children?: React.ReactNode,
    className?: string,
    style?: React.CSSProperties
}

const List = ({children, className, style}: props) => {
    return <div style={style} className={`list${className ? ` ${className}` : ''}`}>{children}</div>
}

export default List