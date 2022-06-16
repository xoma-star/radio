import Title from "../Common/Title";
import HorizontalScroll from "../Common/HorizontalScroll";
import {FILES_LOCATION} from "../../config";
import DesktopIcon from "../Desktop/Icon";
import React from "react";
import {UI_Windows} from "../../Redux/Reducers/ui";
import {useActions} from "../../Hooks/useActions";
import {icon_loading} from "../../Images/Icons";
import TrackSchema from "../../Schemas/track.schema";

interface props{
    header?: string,
    tracks?: TrackSchema[]
}

const TracksScroll = ({header, tracks}: props) => {
    const {UI_OpenWindow, PlayerSetTrack, PlayerClearQueue} = useActions()
    const onIconDoubleClick = (e: TrackSchema) => {
        UI_OpenWindow(UI_Windows.MUSIC_PLAYER)
        PlayerClearQueue()
        PlayerSetTrack(e)
    }

    const onDragStart = (id: string) => (e: React.DragEvent) => {
        e.dataTransfer.setData('text/plain', id)
    }

    return <div>
        <Title style={{marginBottom: 8}}>{header}</Title>
        <HorizontalScroll>
            {tracks?.map(v => <DesktopIcon
                key={'navigator' + v.id}
                draggable
                type={'track'}
                isOnDesktop={false}
                label={`${v.author} - ${v.name}`}
                onDoubleClick={() => onIconDoubleClick(v)}
                id={v.id}
                icon={FILES_LOCATION + v.cover}
                onDragStart={onDragStart(v.id)}
            />)
            }
            {tracks && tracks.length < 1 && <img src={icon_loading} width={32} height={32} alt={'Loading...'}/>}
        </HorizontalScroll>
    </div>
}

export default TracksScroll