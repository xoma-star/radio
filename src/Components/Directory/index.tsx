import './Directory.css'
import DesktopIcon from "../Desktop/Icon";
import {icon_dir, icon_dir_open, icon_share} from "../../Images/Icons";
import React, {useEffect, useState} from "react";
import {UI_Windows} from "../../Redux/Reducers/ui";
import {useActions} from "../../Hooks/useActions";
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import Unauthorized from "../Unauthorized";
import UserService from "../../http/Services/UserService";
import PlaylistService from "../../http/Services/PlaylistService";
import PlaylistSchema from "../../Schemas/playlist.schema";

const Directory = () => {
    const [selected, setSelected] = useState<string | null | undefined>(null)
    const [toDisplay, setToDisplay] = useState<PlaylistSchema[]>([])
    const {authorized} = useTypedSelector(s => s.user)
    const {overview} = useTypedSelector(s => s.playlist)
    const {UI_OpenWindow, PlaylistSetOverview, UI_Warn} = useActions()

    useEffect(() => {
        UserService.getUserPlaylists().then(r => setToDisplay(r.data)).catch(_ => {})
    }, [authorized])

    const onIconClick = (e:  React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        setSelected(e.currentTarget.dataset.id)
    }
    const onIconDoubleClick = (e: string | 'create') => {
        setSelected(null)
        UI_OpenWindow(UI_Windows.PLAYLIST)
        PlaylistSetOverview(e)
    }
    const onFolderClick = (_:  React.MouseEvent<HTMLElement>) => setSelected(null)
    const onDrop = (playlistId: string) => (e: React.DragEvent) => {
        const trackId = e.dataTransfer.getData('text/plain')
        PlaylistService.add(trackId, playlistId)
            .then(r => {
                UI_OpenWindow(UI_Windows.PLAYLIST)
                PlaylistSetOverview(r.data)
            })
            .catch(r => UI_Warn({type: 'error', text: r?.response?.data?.message}))
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
                        onDoubleClick={() => onIconDoubleClick('create')}
                    />
                    {toDisplay.map(v => <DesktopIcon
                        key={v.id}
                        onDragOver={e => {
                            e.preventDefault()
                            e.dataTransfer.dropEffect = "copy"
                        }}
                        type={'playlist'}
                        onDrop={onDrop(v.id)}
                        label={v.name}
                        icon={overview !== 'create' && overview?.id === v.id ? icon_dir_open : icon_dir}
                        isOnDesktop={false}
                        onClick={onIconClick}
                        id={v.id}
                        selected={selected === v.id}
                        onDoubleClick={() => onIconDoubleClick(v.id)}
                    />)}
                </React.Fragment>}
                {!authorized && <Unauthorized/>}
            </div>
        </div>
}

export default Directory