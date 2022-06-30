import './Directory.css'
import DesktopIcon from "../Desktop/Icon";
import {icon_dir, icon_dir_open, icon_share} from "../../Images/Icons";
import React, {useEffect, useState} from "react";
import {UI_Windows} from "../../Redux/Reducers/ui";
import {useActions} from "../../Hooks/useActions";
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import Unauthorized from "../Unauthorized";
import PlaylistService from "../../http/Services/PlaylistService";
import PlaylistSchema from "../../Schemas/playlist.schema";

const Directory = () => {
    const [selected, setSelected] = useState<string | null | undefined>(null)
    const [toDisplay, setToDisplay] = useState<PlaylistSchema[]>([])
    const {authorized, playlists} = useTypedSelector(s => s.user)
    const {overview} = useTypedSelector(s => s.playlist)
    const {minimized, opened} = useTypedSelector(s => s.ui)
    const {UI_OpenWindow, PlaylistSetOverview, UserGetPlaylists} = useActions()

    useEffect(() => {
        setToDisplay(playlists)
    }, [playlists])
    useEffect(() => {
        if(authorized) UserGetPlaylists()
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
        try{
            const {id, type} = JSON.parse(e.dataTransfer.getData('text/plain'))
            if(type !== 'track') return
            PlaylistService.add(id, playlistId)
                .then(r => {
                    UI_OpenWindow(UI_Windows.PLAYLIST)
                    PlaylistSetOverview(r.data)
                })
        }catch{}
    }

    return <div className={'folder'} onClick={onFolderClick}>
            <div className={'panel'}></div>
            {authorized && <div className={'folder-view'}>
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
                    icon={  overview !== 'create' &&
                            overview?.id === v.id &&
                            !minimized[UI_Windows.PLAYLIST] &&
                            opened.indexOf(UI_Windows.PLAYLIST) >= 0 ? icon_dir_open : icon_dir}
                    isOnDesktop={false}
                    onClick={onIconClick}
                    id={v.id}
                    selected={selected === v.id}
                    onDoubleClick={() => onIconDoubleClick(v.id)}
                />)}
            </div>}
            {!authorized && <Unauthorized/>}
        </div>
}

export default Directory