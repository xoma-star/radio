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
                UI_MinimizeWindow(id)
                UI_SetActiveWindow(null)
            }} className={'button-control minimize'}>
                <span className={'noselect'}/>
            </Button>
            <Button onClick={(e) => {
                e.stopPropagation()
                UI_CloseWindow(id)
                UI_SetActiveWindow(null)
            }} className={'button-control close'}>
                <span className={'noselect'}/>
            </Button>
        </div>
    </div>
}

export default WindowHeader