import React from "react";
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import Title from "../Common/Title";
import List from "../Common/List";
import Cell from "../Common/Cell";
import {UI_Windows} from "../../Redux/Reducers/ui";
import {useActions} from "../../Hooks/useActions";
import Button from "../Common/Button";
import IconSmall from "../Icons/IconSmall";

const TracksQueue = () => {
    const {queue, id} = useTypedSelector(s => s.player)
    const {UI_OpenWindow, PlayerSetTrack, PlayerRemoveFromQueue, PlayerAddQueue} = useActions()

    return <div style={{padding: 8}}>
        <Title>Очередь</Title>
        <List
            onDrop={(e) => {
                if(!(e.target instanceof HTMLElement)) return
                if(!e?.dataTransfer?.getData('text/plain')) return
                if(typeof e?.dataTransfer?.getData('text/plain') !== "string") return
                const {id, type} = JSON.parse(e.dataTransfer.getData('text/plain'))
                if(type === 'track') PlayerAddQueue(id)
            }}
            onDragOver={e => {
                e.preventDefault()
                e.dataTransfer.dropEffect = "copy"
            }}
            style={{margin: '8px 0', maxHeight: '50vh'}}
        >
            {queue.map(track => <Cell
                onDoubleClick={() => {
                    UI_OpenWindow(UI_Windows.MUSIC_PLAYER)
                    PlayerSetTrack(track)
                }}
                selected={track.id === id}
                key={'queue' + track.id}
                before={<IconSmall src={track.cover}/>}
                after={ track.id !== id && <Button onClick={() => PlayerRemoveFromQueue(track.id)} className={'button-control close'}/>}
            >{`${track.author} - ${track.name}`}</Cell>)}
        </List>
    </div>
}

export default TracksQueue