import {icon_warn} from "../../Images/Icons";
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import React from "react";
import Button from "../Common/Button";
import {useActions} from "../../Hooks/useActions";

const WarningWindow = () => {
    const {warning} = useTypedSelector(s => s.ui)
    const {UI_Warn} = useActions()
    return <React.Fragment>
        <div className={'warning-window'}>
            <img src={icon_warn} alt={'Ошb,rf'}/>
            <span>{warning}</span>
        </div>
        <Button style={{margin: '8px auto'}} onClick={() => UI_Warn(null)}>OK</Button>
    </React.Fragment>
}

export default WarningWindow