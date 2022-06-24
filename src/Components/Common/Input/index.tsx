import React, {useEffect, useState} from "react";
import './Input.css'

interface props{
    defaultValue?: string,
    onChange?: (e: string) => void,
    className?: string,
    type?: 'text' | 'password',
    label?: string,
    disabled?: boolean,
    autocomplete?: 'username' | 'new-password' | 'email' | 'name' | 'current-password',
    style?: React.CSSProperties
}

const Input = ({defaultValue = '', onChange, className, type = 'text', label, disabled = false, autocomplete, style}: props) => {
    const [value, setValue] = useState(defaultValue)
    useEffect(() => {if(onChange) onChange(value as string)}, [value])
    useEffect(() => setValue(defaultValue), [defaultValue])
    return <div className={'input-wrap'} style={style}>
        {label && <label className={'input-label'}><u>{label[0]}</u>{label.substring(1, label.length)}:</label>}
        <input
            disabled={disabled}
            type={type}
            className={`input${className ? ` ${className}` : ''}`}
            onChange={e => setValue(e.currentTarget.value)}
            value={value}
            autoComplete={autocomplete}
        />
    </div>
}

export default Input