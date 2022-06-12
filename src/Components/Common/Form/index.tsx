import './Form.css'
import React, {ReactNode} from "react";
import {win_install} from "../../../Images/Arts";
import Separator from "../Separator";
import Button from "../Button";

interface props{
    children?: ReactNode,
    header?: string,
    description?: string,
    showArt?: boolean,
    onSubmit?: () => void,
    onCancel?: () => void,
    controlsDisabled?: boolean
}

const Form = ({children, header, description, showArt = false, onCancel, onSubmit, controlsDisabled = false}: props) => {
    const submitHandler = (e: React.MouseEvent) => {
        e.stopPropagation()
        if(onSubmit && !controlsDisabled) onSubmit()
    }
    const declineHandler = (e: React.MouseEvent) => {
        e.stopPropagation()
        if(onCancel && !controlsDisabled) onCancel()
    }
    return <div className={'form-wrapper-wrapper'}>
        <div className={'form-wrapper'}>
            {showArt && <div className={'form-art'}>
                <img alt={'art'} src={win_install}/>
            </div>}
            <div className={'form'}>
                {header && <div className={'form-header'}>{header}</div>}
                {description && <div className={'form-description'}>{description}</div>}
                <div className={'form-fields'}>{children}</div>
            </div>
        </div>
        {(onSubmit || onCancel) && <Separator style={{marginTop: 8, marginBottom: 8}}/>}
        {(onSubmit || onCancel) && <div className={'controls'}>
            {onSubmit && <Button disabled={controlsDisabled} onClick={submitHandler}>Отправить</Button>}
            {onCancel && <Button disabled={controlsDisabled} onClick={declineHandler}>Отмена</Button>}
        </div>}
    </div>
}

export default Form