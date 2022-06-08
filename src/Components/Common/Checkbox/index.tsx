import React, {useEffect, useState} from "react"
import './Checkbox.css'

interface props{
    checkedProp?: boolean,
    label?: string,
    onChange?: (e: boolean) => void
}

const Checkbox = ({checkedProp = false, label = '', onChange}: props) => {
    const [checked, setChecked] = useState<boolean>(checkedProp)
    useEffect(() => {if(onChange) onChange(checked)}, [checked])
    return <React.Fragment>
        <input className={'box'} type={'checkbox'} checked={checked} readOnly/>
        <label className={'checkbox-label'} onClick={() => setChecked((c) => !c)}>{label}</label>
    </React.Fragment>
}

export default Checkbox