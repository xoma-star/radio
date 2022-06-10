import './Form.css'
import {ReactNode} from "react";
import {win_install} from "../../../Images/Arts";

interface props{
    children?: ReactNode,
    header?: string,
    description?: string,
    showArt?: boolean
}

const Form = ({children, header, description, showArt = false}: props) => {
    return <div className={'form-wrapper'}>
        {showArt && <div className={'form-art'}>
            <img alt={'art'} src={win_install}/>
        </div>}
        <div className={'form'}>
            {header && <div className={'form-header'}>{header}</div>}
            {description && <div className={'form-description'}>{description}</div>}
            <div className={'form-fields'}>{children}</div>
        </div>
    </div>
}

export default Form