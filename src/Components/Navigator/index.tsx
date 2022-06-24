import React, {useEffect, useState} from "react";
import TrackService from "../../http/Services/TrackService";
import './Navigator.css'
import TracksScroll from "../TracksScroll";
import TrackSchema from "../../Schemas/track.schema";
import PlaylistSchema from "../../Schemas/playlist.schema";
import PlaylistService from "../../http/Services/PlaylistService";
const Navigator = () => {
    const [newTracks, setNewTracks] = useState<TrackSchema[]>([])
    const [curatedPlaylists, setCurated] = useState<PlaylistSchema[]>([])
    useEffect(() => {
        TrackService.getLatest().then(r => setNewTracks(r.data))
        PlaylistService.getCurated().then(r => setCurated(r.data))
    }, [])
    return <div className={'navigator'}>
        <TracksScroll header={'Последние загрузки'} tracks={newTracks}/>
        <TracksScroll header={'Авторские плейлисты'} tracks={curatedPlaylists}/>
        <TracksScroll header={'Плейлисты под настроение'} tracks={curatedPlaylists}/>
    </div>
}

export default Navigator