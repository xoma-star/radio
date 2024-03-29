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
    style?: React.CSSProperties,
    placeholder?: string
}

const Input = ({defaultValue = '', onChange, className, type = 'text', label, disabled = false, autocomplete, style, placeholder}: props) => {
    const [value, setValue] = useState(defaultValue)
    useEffect(() => {if(onChange) onChange(value?.trim().slice(0, 30) as string)}, [value])
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
            maxLength={30}
            placeholder={placeholder || ''}
        />
    </div>
}

export default Input