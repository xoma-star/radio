import {Clippy} from "../../Agents/Clippy";
import './Unauthorized.css'
import Separator from "../Common/Separator";
import Button from "../Common/Button";
import {useActions} from "../../Hooks/useActions";
import {UI_Windows} from "../../Redux/Reducers/ui";
import React from "react";

const Unauthorized = () => {
    const {UI_OpenWindow} = useActions()
    const handler = (e: React.MouseEvent) => {
        e.stopPropagation()
        UI_OpenWindow(UI_Windows.LOGIN)
    }
    return <div className={'unauthorized-wrapper'}>
        <div className={'agent'}><Clippy/></div>
        <div className={'unauthorized'}>
            <span>Войдите в аккаунт, чтобы продолжить</span>
            <Separator/>
            <Button onClick={handler}>Войти</Button>
        </div>
    </div>
}

export default Unauthorized