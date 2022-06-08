import './Window.css'
import React from "react";
import Draggable from 'react-draggable'
import {UI_Windows} from "../../Redux/Reducers/ui";
import WindowHeader from "./Header";
import useWindow from "../../Hooks/useWindow";
import windows from "../../Constants/windows";


interface props{
    header?: string,
    icon?: React.ReactNode,
    children?: React.ReactNode,
    id: UI_Windows,
    classNameAdd?: string
}

const Window = ({header, icon, children, id, classNameAdd = ''}: props) => {
    const {className, pos, onDrag, onStart, onStop, style, onClick} = useWindow(id)
    if(typeof header === 'undefined') header = windows[id].name
    if(typeof icon === 'undefined') icon = windows[id].icon

    return <Draggable handle={'.draggable-wrapper'}
                      defaultPosition={pos}
                      onDrag={onDrag}
                      onStart={onStart}
                      onStop={onStop}>
        <div
            className={className + (classNameAdd ? ' ' + classNameAdd : '')}
            style={style}
            onClick={onClick}
        >
            <div className={'inner'}>
                <WindowHeader header={header} id={id} icon={icon}/>
                <div className={'content'}>{children}</div>
            </div>
        </div>
    </Draggable>
}

export default Window