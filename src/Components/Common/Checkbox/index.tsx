import React, {useEffect, useState} from "react"
import './Checkbox.css'

interface props{
    defaultChecked?: boolean,
    label?: string,
    onChange?: (e: boolean) => void,
    disabled?: boolean,
    style?: React.CSSProperties
}

const Checkbox = ({defaultChecked = false, label = '', onChange, disabled = false, style}: props) => {
    const [checked, setChecked] = useState<boolean>(defaultChecked)
    useEffect(() => {if(onChange && !disabled) onChange(checked)}, [checked])
    return <React.Fragment>
        <input className={'box'} type={'checkbox'} checked={checked} readOnly/>
        <label
            style={style}
            className={`checkbox-label${disabled ? ' disabled' : ''}`}
            onClick={() => setChecked((c) => !disabled ? !c : c)}>{label}</label>
    </React.Fragment>
}

export default Checkbox