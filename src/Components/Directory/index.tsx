import './Directory.css'
import DesktopIcon from "../Desktop/Icon";
import {icon_cd} from "../../Images/Icons";
import React, {useEffect, useState} from "react";
import {UI_Windows} from "../../Redux/Reducers/ui";
import {useActions} from "../../Hooks/useActions";
import {track} from "../../Redux/Reducers/player";
import {TRACK_DATA_LOCATION} from "../../config";
import Checkbox from "../Common/Checkbox";

const Directory = () => {
    const [selected, setSelected] = useState<string | null | undefined>(null)
    const [tracks, setTracks] = useState<track[]>([])
    const [addToQueue, setAddToQueue] = useState(false)
    const {UI_OpenWindow, PlayerAddQueue, PlayerSetTrack, PlayerClearQueue} = useActions()
    useEffect(() => {
        fetch(TRACK_DATA_LOCATION).then(r => r.json()).then(r => setTracks(r))
    }, [])

    const onIconClick = (e:  React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        setSelected(e.currentTarget.dataset.id)
    }
    const onIconDoubleClick = (e: React.MouseEvent<HTMLElement>) => {
        let a = e.currentTarget.dataset.id as string
        UI_OpenWindow(UI_Windows.MUSIC_PLAYER)
        if(addToQueue)PlayerAddQueue(a)
        else {
            PlayerClearQueue()
            PlayerSetTrack(a)
        }
    }
    const onFolderClick = (_:  React.MouseEvent<HTMLElement>) => setSelected(null)

    return <React.Fragment>
        <div className={'folder'} onClick={onFolderClick}>
            <div className={'panel'}></div>
            <div className={'folder-view'}>
                {tracks.map(v =>
                    <DesktopIcon
                        key={v.id}
                        label={`${v.author} - ${v.name}`}
                        icon={icon_cd}
                        isOnDesktop={false}
                        onClick={onIconClick}
                        id={v.id}
                        selected={selected === v.id}
                        onDoubleClick={onIconDoubleClick}
                    />
                )}
            </div>
        </div>
        <div className={'status-bar selected'}>
           <Checkbox checkedProp={false} onChange={setAddToQueue} label={'Добавить в очередь'}/>
        </div>
    </React.Fragment>
}

export default Directory