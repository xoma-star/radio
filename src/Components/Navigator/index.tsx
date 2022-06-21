import React, {useEffect, useState} from "react";
import TrackService from "../../http/Services/TrackService";
import './Navigator.css'
import TracksScroll from "../TracksScroll";
import TrackSchema from "../../Schemas/track.schema";
const Navigator = () => {
    const [newTracks, setNewTracks] = useState<TrackSchema[]>([])
    useEffect(() => {
        TrackService.getLatest().then(r => setNewTracks(r.data))
    }, [])
    return <div className={'navigator'}>
        <TracksScroll header={'Последние загрузки'} tracks={newTracks}/>
    </div>
}

export default Navigator