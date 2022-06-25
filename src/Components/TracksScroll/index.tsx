import Title from "../Common/Title";
import HorizontalScroll from "../Common/HorizontalScroll";
import {FILES_LOCATION} from "../../config";
import DesktopIcon from "../Desktop/Icon";
import React from "react";
import {UI_Windows} from "../../Redux/Reducers/ui";
import {useActions} from "../../Hooks/useActions";
import {icon_dir, icon_loading} from "../../Images/Icons";
import TrackSchema from "../../Schemas/track.schema";
import PlaylistSchema from "../../Schemas/playlist.schema";
import Button from "../Common/Button";

interface props{
    header?: string,
    tracks?: TrackSchema[] | PlaylistSchema[],
    actions?: {label: string, action: () => void}[]
}

const TracksScroll = ({header, tracks, actions}: props) => {
    const {UI_OpenWindow, PlayerSetTrack, PlayerClearQueue, PlaylistSetOverview} = useActions()
    const onIconDoubleClick = (e: TrackSchema | PlaylistSchema) => {
        if('cover' in e){
            UI_OpenWindow(UI_Windows.MUSIC_PLAYER)
            PlayerClearQueue()
            PlayerSetTrack(e)
        }
        else{
            UI_OpenWindow(UI_Windows.PLAYLIST)
            PlaylistSetOverview(e)
        }
    }

    const onDragStart = (id: string) => (e: React.DragEvent) => {
        e.dataTransfer.setData('text/plain', id)
    }

    return <div>
        <Title style={{marginBottom: 8}}>{header}</Title>
        <HorizontalScroll>
            {tracks && tracks.map(v => <DesktopIcon
                key={'navigator' + v.id}
                draggable
                type={'track'}
                isOnDesktop={false}
                label={'author' in v ? `${v.author} - ${v.name}` : v.name}
                onDoubleClick={() => onIconDoubleClick(v)}
                id={v.id}
                icon={'cover' in v ? (FILES_LOCATION + v.cover) : icon_dir}
                onDragStart={onDragStart(v.id)}
            />)
            }
            {tracks && tracks.length < 1 && <img src={icon_loading} width={32} height={32} alt={'Loading...'}/>}
        </HorizontalScroll>
        {actions && actions?.length > 0 &&
            <div style={{marginTop: 8, display: 'flex', justifyContent: 'space-around'}}>
                {actions.map(r => <Button key={r.label + 'action'} onClick={r.action}>{r.label}</Button>)}
            </div>}
    </div>
}

export default TracksScroll