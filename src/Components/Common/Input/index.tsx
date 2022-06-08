import React, {useEffect, useState} from "react";
import './Input.css'

interface props{
    defaultValue?: string,
    onChange?: (e: string) => void,
    className?: string,
    type?: 'text' | 'password',
    label?: string
}

const Input = ({defaultValue = '', onChange, className, type = 'text', label}: props) => {
    const [value, setValue] = useState(defaultValue)
    useEffect(() => {if(onChange) onChange(value as string)}, [value])
    return <div className={'input-wrap'}>
        {label && <label className={'input-label'}><u>{label[0]}</u>{label.substring(1, label.length)}:</label>}
        <input
            className={`input${className ? ` ${className}` : ''}`}
            onChange={e => setValue(e.currentTarget.value)}
            value={value}
        />
    </div>
}

export default Input