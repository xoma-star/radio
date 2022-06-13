import {track} from "../../Redux/Reducers/player";
import Title from "../Common/Title";
import HorizontalScroll from "../Common/HorizontalScroll";
import {SERVER_LOCATION} from "../../config";
import DesktopIcon from "../Desktop/Icon";
import React, {useState} from "react";
import {UI_Windows} from "../../Redux/Reducers/ui";
import {useActions} from "../../Hooks/useActions";
import {icon_loading} from "../../Images/Icons";

interface props{
    header?: string,
    tracks?: track[]
}

const TracksScroll = ({header, tracks}: props) => {
    const {UI_OpenWindow, PlayerSetTrack, PlayerClearQueue} = useActions()
    const onIconDoubleClick = (e: React.MouseEvent<HTMLElement>) => {
        let a = e.currentTarget.dataset.id as string
        UI_OpenWindow(UI_Windows.MUSIC_PLAYER)
        PlayerClearQueue()
        PlayerSetTrack(a)
    }

    const onDragStart = (id: string) => (e: React.DragEvent) => {
        e.dataTransfer.setData('text/plain', id)
    }

    return <div>
        <Title style={{marginBottom: 8}}>{header}</Title>
        <HorizontalScroll>
            {tracks?.map(v => <DesktopIcon
                draggable
                type={'track'}
                isOnDesktop={false}
                label={`${v.author} - ${v.name}`}
                onDoubleClick={onIconDoubleClick}
                id={v.id}
                icon={SERVER_LOCATION + v.cover}
                onDragStart={onDragStart(v.id)}
            />)
            }
            {tracks && tracks.length < 1 && <img src={icon_loading} width={32} height={32} alt={'Loading...'}/>}
        </HorizontalScroll>
    </div>
}

export default TracksScroll