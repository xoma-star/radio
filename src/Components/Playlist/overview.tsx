import PlaylistSchema from "../../Schemas/playlist.schema";
import {useEffect, useState} from "react";
import PlaylistService from "../../http/Services/PlaylistService";
import {useActions} from "../../Hooks/useActions";
import React from "react";
import Title from "../Common/Title";
import Button from "../Common/Button";
import Cell from "../Common/Cell";
import TrackSchema from "../../Schemas/track.schema";
import TrackService from "../../http/Services/TrackService";
import IconSmall from "../Icons/IconSmall";
import List from "../Common/List";
import {UI_Windows} from "../../Redux/Reducers/ui";
import {FILES_LOCATION} from "../../config";

interface props{
    overview: string
}

const PlaylistOverview = ({overview}: props) => {
    const [playlistData, setPlaylistData] = useState<PlaylistSchema>()
    const [tracks, setTracks] = useState<TrackSchema[]>()
    const {UI_Warn, UI_OpenWindow, PlayerClearQueue, PlayerSetTrack} = useActions()
    useEffect(() => {
        PlaylistService.getOne(overview)
            .then(async r => {
                setPlaylistData(r.data)
                setTracks((await TrackService.getMultiple(r.data.tracks)).data)
            })
            .catch(e => UI_Warn({type: 'warning', text: e?.data?.message}))
    }, [overview])

    return  <React.Fragment>
        <Title>{playlistData?.name}</Title>
        <List style={{margin: '8px 0'}}>
            {tracks?.map(r =>
                <Cell onClick={() => {
                    UI_OpenWindow(UI_Windows.MUSIC_PLAYER)
                    PlayerClearQueue()
                    PlayerSetTrack(r)
                }}
                      before={<IconSmall
                          src={FILES_LOCATION + r.cover}/>} key={'playlist' + r.id}>{r.author} - {r.name}</Cell>)}
        </List>
        <div style={{display: 'flex'}}>
            <Button>Перемешать</Button>
            <Button>В очередь</Button>
            <Button disabled>Удалить</Button>
        </div>
    </React.Fragment>
}

export default PlaylistOverview