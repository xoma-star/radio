import Title from "../Common/Title";
import HorizontalScroll from "../Common/HorizontalScroll";
import React, {useEffect, useState} from "react";
import {track} from "../../Redux/Reducers/player";
import DesktopIcon from "../Desktop/Icon";
import TrackService from "../../http/Services/TrackService";
import {SERVER_LOCATION} from "../../config";
import './Navigator.css'
import {useActions} from "../../Hooks/useActions";
import {UI_Windows} from "../../Redux/Reducers/ui";
const Navigator = () => {
    const [newTracks, setNewTracks] = useState<track[]>([])
    const {UI_OpenWindow, PlayerClearQueue, PlayerSetTrack} = useActions()
    useEffect(() => {
        TrackService.getTracks().then(r => setNewTracks(r.data))
    }, [])
    const onIconDoubleClick = (e: React.MouseEvent<HTMLElement>) => {
        let a = e.currentTarget.dataset.id as string
        UI_OpenWindow(UI_Windows.MUSIC_PLAYER)
        PlayerClearQueue()
        PlayerSetTrack(a)
    }
    return <div className={'navigator'}>
        <div>
            <Title style={{marginBottom: 8}}>Новинки</Title>
            <HorizontalScroll>{newTracks.map(v => <DesktopIcon
                label={`${v.author} - ${v.name}`}
                onDoubleClick={onIconDoubleClick}
                id={v.id}
                icon={SERVER_LOCATION + v.cover}/>)}</HorizontalScroll>
        </div>
    </div>
}

export default Navigator