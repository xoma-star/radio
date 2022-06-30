import './Unauthorized.css'
import Button from "../Common/Button";
import {useActions} from "../../Hooks/useActions";
import {UI_Windows} from "../../Redux/Reducers/ui";
import React from "react";
import Placeholder from "../Common/Placeholder";
import {icon_warn} from "../../Images/Icons";

const Unauthorized = () => {
    const {UI_OpenWindow} = useActions()
    const handler = (e: React.MouseEvent) => {
        e.stopPropagation()
        UI_OpenWindow(UI_Windows.LOGIN)
    }
    return <Placeholder
        src={icon_warn}
        header={'Войдите в аккаунт'}
        description={'Войдите аккаунт, чтобы получить доступ к большему количеству возможностей'}
        actions={<Button onClick={handler}>Войти</Button>}
        />
}

export default Unauthorized