import React, {useEffect, useState} from "react";
import TrackService from "../../http/Services/TrackService";
import './Navigator.css'
import TracksScroll from "../TracksScroll";
import TrackSchema from "../../Schemas/track.schema";
import PlaylistSchema from "../../Schemas/playlist.schema";
import PlaylistService from "../../http/Services/PlaylistService";
import {firebaseLogEvent} from "../../Firebase";
const Navigator = () => {
    const [newTracks, setNewTracks] = useState<TrackSchema[]>([])
    const [curatedPlaylists, setCurated] = useState<PlaylistSchema[]>([])
    const [luckTracks, setLuckTracks] = useState<TrackSchema[]>([])
    const [popular, setPopular] = useState<TrackSchema[]>([])
    useEffect(() => {
        TrackService.getLatest().then(r => setNewTracks(r.data))
        PlaylistService.getRandom(10).then(r => setCurated(r.data))
        TrackService.getRandom(10).then(r => setLuckTracks(r.data))
        TrackService.getMostListened().then(r => setPopular(r.data))
        firebaseLogEvent('opened:navigator')
    }, [])
    return <div className={'navigator'}>
        <TracksScroll header={'Последние загрузки'} tracks={newTracks}/>
        <TracksScroll header={'Мне повезет'}
                      tracks={luckTracks}
                      actions={[{label: 'Мне повезет', action: () => TrackService.getRandom(10).then(r => setLuckTracks(r.data))}]}/>
        <TracksScroll header={'Пользовательские плейлисты'}
                      tracks={curatedPlaylists}
                      actions={[{label: 'Другие', action: () => PlaylistService.getRandom(10).then(r => setCurated(r.data))}]}/>
        <TracksScroll header={'Прослушивают чаще всего'} tracks={popular}/>
    </div>
}

export default Navigator