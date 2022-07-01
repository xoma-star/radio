import IconSmall from "../Icons/IconSmall";
import Button from "../Common/Button";
import React, {ReactNode} from "react";
import {UI_Windows} from "../../Redux/Reducers/ui";
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import {useActions} from "../../Hooks/useActions";

interface props{
    header: string,
    icon?: string | ReactNode,
    id: UI_Windows
}

const WindowHeader = ({icon, header, id}: props) => {
    const {activeWindow} = useTypedSelector(s => s.ui)
    const {UI_MinimizeWindow, UI_SetActiveWindow, UI_CloseWindow} = useActions()
    return <div className={`header ${activeWindow === id ? 'active' : ''}`}>
        <div className={'draggable-wrapper'}>
            {icon && <IconSmall src={icon as string} className={'headerIcon'}/>}
            <span>{header}</span>
        </div>
        <div className={'controls'}>
            <Button onClick={(e) => {
                e.stopPropagation()
                UI_SetActiveWindow(null)
                UI_MinimizeWindow(id)
            }} className={'button-control minimize'}/>
            <Button onClick={(e) => {
                e.stopPropagation()
                UI_SetActiveWindow(null)
                UI_CloseWindow(id)
            }} className={'button-control close'}/>
        </div>
    </div>
}

export default WindowHeader