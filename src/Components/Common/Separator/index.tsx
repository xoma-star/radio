import './Separator.css'
import React from "react";

interface props{
    className?: string,
    style?: React.CSSProperties
}

const Separator = ({className, style = {}}: props) => {
    return <div className={`separator${className ? ` ${className}` : ''}`} style={style}/>
}

export default Separator