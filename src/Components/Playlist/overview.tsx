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

interface props{
    overview: PlaylistSchema
}

const PlaylistOverview = ({overview}: props) => {
    const [tracks, setTracks] = useState<TrackSchema[]>()
    const {UI_OpenWindow, PlayerClearQueue, PlayerSetTrack, PlayerAddQueue, PlaylistSetOverview, UI_Warn, UI_CloseWindow} = useActions()
    const {id} = useTypedSelector(s => s.player)
    useEffect(() => {
        TrackService.getMultiple(overview.tracks)
            .then(r => setTracks(r.data))
    }, [overview.tracks])

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
                UI_CloseWindow(UI_Windows.PLAYLIST)
                UI_CloseWindow(UI_Windows.MUSIC_FOLDER)
                PlaylistSetOverview(null)
                UI_Warn({type: 'success', text: 'Плейлист был удален из вашей библиотеки, но пока остается у других пользователей. Вы сможете восстановить его в течение 7 дней, после он будет удален полностью. Для восстановления используйте id: ' + r.data})
            })
    }

    return  <React.Fragment>
        <Title>{overview?.name}</Title>
        <List onDrop={onDrop} onDragOver={e => {
            e.preventDefault()
            e.dataTransfer.dropEffect = "copy"
        }} style={{margin: '8px 0'}}>
            {tracks?.map(r => <Cell
                onDoubleClick={() => {
                    UI_OpenWindow(UI_Windows.MUSIC_PLAYER)
                    PlayerClearQueue()
                    PlayerSetTrack(r)
                }}
                after={<Button onClick={removeFromPlaylist(r.id)} className={'button-control close'}/>}
                selected={r.id === id}
                before={<IconSmall src={FILES_LOCATION + r.cover}/>}
                key={'playlist' + r.id}>{r.author} - {r.name}</Cell>)}
        </List>
        <div style={{display: 'flex'}}>
            <Button onClick={shuffle}>Перемешать</Button>
            <Button onClick={addToQueue}>В очередь</Button>
            <Button onClick={deletePlaylist}>Удалить</Button>
            <Button disabled>Сохранить</Button>
        </div>
    </React.Fragment>
}

export default PlaylistOverview