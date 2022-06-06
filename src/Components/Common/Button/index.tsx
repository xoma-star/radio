import './Button.css'
import React from "react";

interface props{
    disabled?: boolean,
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    children?: string | React.ReactNode,
    className?: string
}

const Button = ({children, disabled = false, onClick, className = ''}: props) => {
    return <button
        onClick={onClick}
        disabled={disabled}
        className={'button98' + (className ? ' ' + className : '')}>
        {children}
    </button>
}

export default Button