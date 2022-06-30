import React from "react";
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import Title from "../Common/Title";
import List from "../Common/List";
import Cell from "../Common/Cell";
import {UI_Windows} from "../../Redux/Reducers/ui";
import {useActions} from "../../Hooks/useActions";
import Button from "../Common/Button";
import IconSmall from "../Icons/IconSmall";
import Separator from "../Common/Separator";
import Checkbox from "../Common/Checkbox";

const TracksQueue = () => {
    const {queue, id, autoplay, random} = useTypedSelector(s => s.player)
    const {UI_OpenWindow, PlayerSetTrack, PlayerRemoveFromQueue, PlayerAddQueue, PlayerSetAutoPlay} = useActions()

    return <div style={{padding: 8}}>
        <Title>Очередь</Title>
        <List
            onDrop={(e) => {
                if(!(e.target instanceof HTMLElement)) return
                if(!e?.dataTransfer?.getData('text/plain')) return
                if(typeof e?.dataTransfer?.getData('text/plain') !== "string") return
                try{
                    const {id, type} = JSON.parse(e.dataTransfer.getData('text/plain'))
                    if(type === 'track') PlayerAddQueue(id)
                }catch{}
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
                selected={track.id === id && track.random === random}
                key={'queue' + track.id + track.random}
                before={<IconSmall src={track.cover}/>}
                after={ track.random !== random && <Button onClick={() => PlayerRemoveFromQueue(track.id, track.random)} className={'button-control close'}/>}
            >{`${track.author} - ${track.name}`}</Cell>)}
        </List>
        <Separator style={{marginBottom: 8}}/>
        <Checkbox label={'Автовоспроизведение'} defaultChecked={autoplay} onChange={r => PlayerSetAutoPlay(r)}/>
    </div>
}

export default TracksQueue