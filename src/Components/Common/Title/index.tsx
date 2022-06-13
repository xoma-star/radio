import './Title.css'
import React from "react";

interface props{
    children?: string,
    className?: string,
    style?: React.CSSProperties
}

const Title = ({children, className, style}: props) => {
    return <span style={style} className={`title-common${className ? ` ${className}` : ``}`}>
        {children}
    </span>
}

export default Title