import './Button.css'
import React from "react";

interface props{
    disabled?: boolean,
    onClick?: (e: React.MouseEvent) => void,
    children?: string | React.ReactNode,
    className?: string,
    style?: React.CSSProperties
}

const Button = ({children, disabled = false, onClick, className = '', style = {}}: props) => {
    const clickHandler = (e: React.MouseEvent) => {
        if('vibrate' in navigator) navigator.vibrate(30)
        if(onClick) onClick(e)
    }
    return <button
        style={style}
        onClick={clickHandler}
        disabled={disabled}
        className={'button98' + (className ? ' ' + className : '')}>
        {children}
    </button>
}

export default Button