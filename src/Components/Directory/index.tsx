import './Directory.css'
import DesktopIcon from "../Desktop/Icon";
import {icon_dir_open, icon_share} from "../../Images/Icons";
import React, {useEffect, useState} from "react";
import {UI_Windows} from "../../Redux/Reducers/ui";
import {useActions} from "../../Hooks/useActions";
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import Unauthorized from "../Unauthorized";
import UserService from "../../http/Services/UserService";
import PlaylistService from "../../http/Services/PlaylistService";

const Directory = () => {
    const [selected, setSelected] = useState<string | null | undefined>(null)
    const [toDisplay, setToDisplay] = useState<any[]>([])
    const {authorized} = useTypedSelector(s => s.user)
    const {UI_OpenWindow, PlaylistSetOverview} = useActions()

    useEffect(() => {
        UserService.getUserPlaylists().then(r => setToDisplay(r.data)).catch(r => console.log(r))
    }, [])

    const onIconClick = (e:  React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        setSelected(e.currentTarget.dataset.id)
    }
    const onIconDoubleClick = (e: React.MouseEvent<HTMLElement>) => {
        let a = e.currentTarget.dataset.id as string
        UI_OpenWindow(UI_Windows.PLAYLIST)
        PlaylistSetOverview(a)
    }
    const onFolderClick = (_:  React.MouseEvent<HTMLElement>) => setSelected(null)
    const onDrop = (playlistId: string) => (e: React.DragEvent) => {
        const trackId = e.dataTransfer.getData('text/plain')
        PlaylistService.add(trackId, playlistId).then(r => console.log(r)).catch(r => console.log(r))
    }

    return <div className={'folder'} onClick={onFolderClick}>
            <div className={'panel'}></div>
            <div className={'folder-view'}>
                {authorized && <React.Fragment>
                    <DesktopIcon
                        type={'playlist'}
                        label={`Новый плейлист`}
                        icon={icon_share}
                        isOnDesktop={false}
                        onClick={onIconClick}
                        id={'create'}
                        selected={selected === 'create'}
                        onDoubleClick={onIconDoubleClick}
                    />
                    {toDisplay.map(v => <DesktopIcon
                        onDragOver={e => {
                            e.preventDefault()
                            e.dataTransfer.dropEffect = "copy"
                        }}
                        type={'playlist'}
                        onDrop={onDrop(v.id)}
                        label={v.name}
                        icon={icon_dir_open}
                        isOnDesktop={false}
                        onClick={onIconClick}
                        id={v.id}
                        selected={selected === v.id}
                        onDoubleClick={onIconDoubleClick}
                    />)}
                </React.Fragment>}
                {!authorized && <Unauthorized/>}
            </div>
        </div>
}

export default Directory