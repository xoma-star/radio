import React from "react";
import {UI_Windows} from "../../Redux/Reducers/ui";

interface props {
    label: string,
    icon: any,
    selected?: boolean,
    onClick?: (e:  React.MouseEvent<HTMLElement>) => void,
    onDoubleClick?: (e:  React.MouseEvent<HTMLElement>) => void,
    id?: UI_Windows | string,
    isOnDesktop?: boolean
}

const DesktopIcon = ({label, selected = false, onClick, id, onDoubleClick, icon, isOnDesktop = true}: props) => {
    let m = {'--mask': `url(${icon})`} as React.CSSProperties
    return <div
        data-id={id}
        className={`desktop-icon non-default-select${selected ? ' selected' : ''}${!isOnDesktop ? ' inDir' : ''}`}
        onClick={onClick ? (e:  React.MouseEvent<HTMLElement>) => onClick(e) : () => {}}
        onDoubleClick={onDoubleClick ? (e:  React.MouseEvent<HTMLElement>) => onDoubleClick(e) : () => {}}
    >
        <div className={'icon-wrapper'}>
            <img alt={'posh'} src={icon}
                 width="32" height="32"/>
            <div className="selection-effect" style={m}/>
        </div>
        <div className={'title'}>{label}</div>
    </div>
}

export default DesktopIcon