import PlaylistSchema from "../../Schemas/playlist.schema";
import React, {useEffect, useState} from "react";
import PlaylistService from "../../http/Services/PlaylistService";
import {useActions} from "../../Hooks/useActions";
import Title from "../Common/Title";
import Button from "../Common/Button";
import Cell from "../Common/Cell";
import TrackSchema from "../../Schemas/track.schema";
import TrackService from "../../http/Services/TrackService";
import IconSmall from "../Icons/IconSmall";
import List from "../Common/List";
import {UI_Windows} from "../../Redux/Reducers/ui";
import {FILES_LOCATION} from "../../config";
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import UserService from "../../http/Services/UserService";
import Input from "../Common/Input";
import Checkbox from "../Common/Checkbox";
import Separator from "../Common/Separator";

interface props{
    overview: PlaylistSchema
}

const PlaylistOverview = ({overview}: props) => {
    const [tracks, setTracks] = useState<TrackSchema[]>()
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(overview.name)
    const [isPublic, setIsPublic] = useState(overview.isPublic)
    const {UI_OpenWindow, PlayerClearQueue, PlayerSetTrack, PlayerAddQueue, PlaylistSetOverview, UI_Warn, UserGetPlaylists} = useActions()
    const {id} = useTypedSelector(s => s.player)
    const user = useTypedSelector(s => s.user)
    useEffect(() => {
        TrackService.getMultiple(overview.tracks)
            .then(r => setTracks(r.data))
    }, [overview.tracks])

    useEffect(() => {
        setName(overview.name)
        setIsPublic(overview.isPublic)
    }, [overview.name, overview.isPublic])

    const addToQueue = (e: React.MouseEvent) => {
        e.stopPropagation()
        tracks?.forEach(r => PlayerAddQueue(r))
        UI_OpenWindow(UI_Windows.MUSIC_PLAYER)
    }

    const shuffle = (e: React.MouseEvent) => {
        e.stopPropagation()
        if(typeof tracks === 'undefined') return
        PlayerClearQueue()
        const a = [...tracks]
        a.sort(_ => Math.random() > 0.5 ? 1 : -1)
        a.forEach(r => PlayerAddQueue(r))
        UI_OpenWindow(UI_Windows.MUSIC_PLAYER)
    }

    const removeFromPlaylist = (trackId: string) => (e: React.MouseEvent) => {
        e.stopPropagation()
        if(user.id !== overview.owner ) return
        PlaylistService.removeTrack(trackId, overview.id)
            .then(r => PlaylistSetOverview(r.data))
    }

    const onDrop = (e: React.DragEvent) => {
        if(!overview.id) return
        const trackId = e.dataTransfer.getData('text/plain')
        if(!trackId) return
        PlaylistService.add(trackId, overview.id)
            .then(r => {
                UI_OpenWindow(UI_Windows.PLAYLIST)
                PlaylistSetOverview(r.data)
            })
    }

    const deletePlaylist = () => {
        if(!overview.id) return
        PlaylistService.delete(overview.id)
            .then(r => {
                // PlaylistSetOverview(null)
                UserGetPlaylists()
                if(typeof r.data === "string")UI_Warn({type: 'success', text: 'Плейлист был удален из вашей библиотеки, но он останется у других пользователей.'})
            })
    }

    const savePlaylist = () => {
        if(!overview.id) return
        UserService.savePlaylist(overview.id)
            .then(() => UserGetPlaylists())
    }

    const updateData = () => {
        if(overview.name !== name || overview.isPublic !== isPublic) {
            PlaylistService.rename(overview.id, name, isPublic)
                .then(r => {
                    PlaylistSetOverview(r.data)
                    setIsEditing(false)
                })
                .catch(() => setIsEditing(false))
        }else setIsEditing(false)
    }

    return  <React.Fragment>
        <Title>{overview?.name}</Title>
        <List onDrop={onDrop} onDragOver={e => {
            e.preventDefault()
            e.dataTransfer.dropEffect = "copy"
        }} style={{margin: '8px 0', maxHeight: '50vh'}}>
            {tracks?.map(r => <Cell
                onDoubleClick={() => {
                    UI_OpenWindow(UI_Windows.MUSIC_PLAYER)
                    PlayerClearQueue()
                    PlayerSetTrack(r)
                }}
                after={user.id === overview.owner && isEditing && <Button onClick={removeFromPlaylist(r.id)} className={'button-control close'}/>}
                selected={r.id === id}
                before={<IconSmall src={FILES_LOCATION + r.cover}/>}
                key={'playlist' + r.id}>{r.author} - {r.name}</Cell>)}
        </List>
        {isEditing && <React.Fragment>
            <Separator style={{margin: '8px 0'}}/>
            <Input defaultValue={name} label={'Название'} style={{marginBottom: 8}} onChange={setName}/>
            <Checkbox label={'Виден для всех'} defaultChecked={isPublic} style={{marginBottom: 8}} onChange={setIsPublic}/>
        </React.Fragment>}
        <div style={{display: 'flex'}}>
            <Button onClick={shuffle}>Перемешать</Button>
            <Button onClick={addToQueue}>В очередь</Button>
            {(user.id === overview.owner || user.playlists.findIndex(s => s.id === overview.id) >= 0) && <Button onClick={deletePlaylist}>Удалить</Button>}
            {user.playlists.findIndex(s => s.id === overview.id) < 0 && <Button onClick={savePlaylist}>Сохранить</Button>}
            {user.id === overview.owner && (
                (!isEditing && <Button onClick={() => {setIsEditing(true)}}>Изменить</Button>)
                || (isEditing && <Button onClick={updateData}>Сохранить</Button>)
            )}
        </div>
    </React.Fragment>
}

export default PlaylistOverview