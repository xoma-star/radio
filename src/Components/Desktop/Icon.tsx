import React from "react";
import {UI_Windows} from "../../Redux/Reducers/ui";

interface props {
    label: string,
    icon: any,
    selected?: boolean,
    onClick?: (e:  React.MouseEvent<HTMLElement>) => void,
    onDoubleClick?: (e:  React.MouseEvent<HTMLElement>) => void,
    id?: UI_Windows | string,
    isOnDesktop?: boolean,
    type: 'desktop' | 'playlist' | 'track',
    onDragOver?: (e: React.DragEvent) => void,
    onDrop?: (e: React.DragEvent) => void,
    onDragStart?: (e: React.DragEvent) => void,
    onDragEnd?: (e: React.DragEvent) => void,
    onDragLeave?: (e: React.DragEvent) => void,
    onDragEnter?: (e: React.DragEvent) => void,
    draggable?: boolean
}

const DesktopIcon = ({label, draggable = false,
                         selected = false, onClick,
                         id, onDoubleClick,
                         icon, isOnDesktop = true,
                         onDrop, onDragOver,
                         onDragStart, onDragEnd,
                         onDragEnter, onDragLeave}: props) => {
    let m = {'--mask': `url(${icon})`} as React.CSSProperties
    return <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        draggable={draggable}
        data-id={id}
        className={`desktop-icon non-default-select${selected ? ' selected' : ''}${!isOnDesktop ? ' inDir' : ''}`}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
    >
        <div className={'icon-wrapper'}>
            <img crossOrigin={'use-credentials'} draggable={false} alt={'posh'} src={icon}
                 width="32" height="32"/>
            <div className="selection-effect" style={m}/>
        </div>
        <div className={'title'}>{label}</div>
    </div>
}

export default DesktopIcon