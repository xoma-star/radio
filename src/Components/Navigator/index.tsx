import React, {useEffect, useState} from "react";
import {track} from "../../Redux/Reducers/player";
import TrackService from "../../http/Services/TrackService";
import './Navigator.css'
import TracksScroll from "../TracksScroll";
const Navigator = () => {
    const [newTracks, setNewTracks] = useState<track[]>([])
    useEffect(() => {
        TrackService.getTracks().then(r => setNewTracks(r.data))
    }, [])
    return <div className={'navigator'}>
        <TracksScroll header={'Последние загрузки'} tracks={newTracks}/>
    </div>
}

export default Navigator