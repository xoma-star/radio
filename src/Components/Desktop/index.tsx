import './Desktop.css'
import DesktopIcon from "./Icon";
import React, {useState} from "react";
import {UI_Windows} from "../../Redux/Reducers/ui";
import {useActions} from "../../Hooks/useActions";
import windows from "../../Constants/windows";
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import {icon_network} from "../../Images/Icons";

const Desktop = () => {
    const [selected, setSelected] = useState<string | null | undefined>(null)
    const {UI_OpenWindow, UI_SetActiveWindow} = useActions()
    const {background} = useTypedSelector(s => s.ui)
    const onDesktopClick = (_:  React.MouseEvent<HTMLElement>) => {
        setSelected(null)
        UI_SetActiveWindow(null)
    }
    const onIconClick = (e:  React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        setSelected(e.currentTarget.dataset.id)
    }
    const onIconDoubleClick = (e: React.MouseEvent<HTMLElement>) => {
        let a = e.currentTarget.dataset.id as UI_Windows
        UI_OpenWindow(a)
        setSelected(null)
    }

    return <div className={'desktop'} onClick={onDesktopClick} style={{'--color': background} as React.CSSProperties}>
        {(Object.keys(windows) as (keyof typeof windows)[]).map(v => {
            if(windows[v].showOnDesktop) return <DesktopIcon
                type={'desktop'}
                key={v}
                label={windows[v].name}
                icon={windows[v].icon}
                onClick={onIconClick}
                id={v}
                selected={selected === v}
                onDoubleClick={onIconDoubleClick}
            />
        })}
        <DesktopIcon
            type={'desktop'}
            label={'Лучший VPN'}
            icon={icon_network}
            onClick={onIconClick}
            id={'vpn'}
            selected={selected === 'vpn'}
            onDoubleClick={() => window.open('https://vpn.xoma-star.space', '_blank')}
        />
    </div>
}

export default Desktop