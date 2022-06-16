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
    const {UI_Warn, UI_OpenWindow, PlayerClearQueue, PlayerSetTrack, PlayerAddQueue} = useActions()
    const {id} = useTypedSelector(s => s.player)
    useEffect(() => {
        TrackService.getMultiple(overview.tracks)
            .then(r => setTracks(r.data))
            .catch(e => UI_Warn(e?.data?.message))
    }, [overview])

    const addToQueue = () => {
        tracks?.forEach(r => PlayerAddQueue(r))
        UI_OpenWindow(UI_Windows.MUSIC_PLAYER)
    }

    return  <React.Fragment>
        <Title>{overview?.name}</Title>
        <List style={{margin: '8px 0'}}>
            {tracks?.map(r => <Cell
                onDoubleClick={() => {
                    UI_OpenWindow(UI_Windows.MUSIC_PLAYER)
                    PlayerClearQueue()
                    PlayerSetTrack(r)
                }}
                selected={r.id === id}
                before={<IconSmall src={FILES_LOCATION + r.cover}/>}
                key={'playlist' + r.id}>{r.author} - {r.name}</Cell>)}
        </List>
        <div style={{display: 'flex'}}>
            <Button disabled>Перемешать</Button>
            <Button onClick={addToQueue}>В очередь</Button>
            <Button disabled>Удалить</Button>
        </div>
    </React.Fragment>
}

export default PlaylistOverview