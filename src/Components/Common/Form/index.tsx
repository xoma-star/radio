import './Form.css'
import {ReactNode} from "react";
import {win_install} from "../../../Images/Arts";

interface props{
    children?: ReactNode,
    header?: string,
    description?: string
}

const Form = ({children, header, description}: props) => {
    return <div className={'form-wrapper'}>
        <div className={'form-art'}>
            <img src={win_install}/>
        </div>
        <div className={'form'}>
            <div className={'form-header'}>{header}</div>
            <div className={'form-description'}>{description}</div>
            <div className={'form-fields'}>{children}</div>
        </div>
    </div>
}

export default Form