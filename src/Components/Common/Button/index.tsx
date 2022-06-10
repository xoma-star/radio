import './Button.css'
import React from "react";

interface props{
    disabled?: boolean,
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    children?: string | React.ReactNode,
    className?: string,
    style?: React.CSSProperties
}

const Button = ({children, disabled = false, onClick, className = '', style = {}}: props) => {
    return <button
        style={style}
        onClick={onClick}
        disabled={disabled}
        className={'button98' + (className ? ' ' + className : '')}>
        {children}
    </button>
}

export default Button