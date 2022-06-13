import './Directory.css'
import DesktopIcon from "../Desktop/Icon";
import {icon_cd, icon_dir_open, icon_share} from "../../Images/Icons";
import React, {useState} from "react";
import {UI_Windows} from "../../Redux/Reducers/ui";
import {useActions} from "../../Hooks/useActions";
import {track} from "../../Redux/Reducers/player";
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import Unauthorized from "../Unauthorized";

const Directory = () => {
    const [selected, setSelected] = useState<string | null | undefined>(null)
    const [tracks, setTracks] = useState<track[]>([])
    const {authorized} = useTypedSelector(s => s.user)
    const {UI_OpenWindow, PlayerSetTrack, PlayerClearQueue} = useActions()

    const onIconClick = (e:  React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        setSelected(e.currentTarget.dataset.id)
    }
    const onIconDoubleClick = (e: React.MouseEvent<HTMLElement>) => {
        let a = e.currentTarget.dataset.id as string
        UI_OpenWindow(UI_Windows.MUSIC_PLAYER)
        PlayerClearQueue()
        PlayerSetTrack(a)
    }
    const onFolderClick = (_:  React.MouseEvent<HTMLElement>) => setSelected(null)

    return <div className={'folder'} onClick={onFolderClick}>
            <div className={'panel'}></div>
            <div className={'folder-view'}>
                <DesktopIcon
                    type={'playlist'}
                    label={`Новый плейлист`}
                    icon={icon_share}
                    isOnDesktop={false}
                    onClick={onIconClick}
                    id={'share'}
                    selected={selected === 'share'}
                    onDoubleClick={onIconDoubleClick}
                />
                <DesktopIcon
                    onDragOver={e => {
                        e.preventDefault()
                        e.dataTransfer.dropEffect = "copy"
                    }}
                    type={'playlist'}
                    onDrop={e => console.log(e.dataTransfer.getData('text/plain'))}
                    label={`Абоба`}
                    icon={icon_dir_open}
                    isOnDesktop={false}
                    onClick={onIconClick}
                    id={'dir'}
                    selected={selected === 'dir'}
                    onDoubleClick={onIconDoubleClick}
                />
                {!authorized && <Unauthorized/>}
            </div>
        </div>
}

export default Directory