import {icon_error, icon_success, icon_warn} from "../../Images/Icons";
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import React from "react";
import Button from "../Common/Button";
import {useActions} from "../../Hooks/useActions";

const WarningWindow = () => {
    const {warning} = useTypedSelector(s => s.ui)
    let icon
    switch (warning?.type){
        case 'success':
            icon = icon_success
            break
        case 'error':
            icon = icon_error
            break
        default: icon = icon_warn
    }
    const {UI_Warn} = useActions()
    return <React.Fragment>
        <div className={'warning-window'}>
            <img src={icon} alt={'Ошb,rf'}/>
            <div style={{textAlign: "center", width: "100%"}}>{warning?.text}</div>
        </div>
        <Button style={{margin: '8px auto'}} onClick={() => UI_Warn(null)}>OK</Button>
    </React.Fragment>
}

export default WarningWindow