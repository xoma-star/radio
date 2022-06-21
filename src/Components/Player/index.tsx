import React from "react"
import './Player.css'
import DragBar from "../DragBar";
import usePlayer from "../../Hooks/usePlayer";
import secondsToHuman from "../../Functions/secondsToHuman";
import Button from "../Common/Button";
import {icon_dir, icon_loading} from "../../Images/Icons";
import usePlayerAddToPlaylist from "../../Hooks/usePlayerAddToPlaylist";
import List from "../Common/List";
import Cell from "../Common/Cell";
import Title from "../Common/Title";
import IconSmall from "../Icons/IconSmall";

const Player = () => {
    const {
        trackRef,
        played,
        duration,
        path,
        dragging,
        startTrack,
        stopTrack,
        onRatioUpdate,
        onBarClick,
        onDragStart,
        onDragEnd,
        nextTrack,
        prevTrack,
        playing,
        name,
        id,
        author,
        cover,
        canPlayNext,
        canPlayPrev,
        loading,
        openQueue
    } = usePlayer()

    const {
        addToPlaylistButtonClickHandler,
        playlists,
        showPlaylists,
        closeButtonClickHandler,
        onCellDoubleClick
    } = usePlayerAddToPlaylist()

    return <div className={'player-wrapper'}>
        <div className={`cover selected${loading && id ? ' tinted' : ''}`}>
            <img src={cover} crossOrigin={'use-credentials'}/>
            <img alt={'Loading...'} src={icon_loading} width={32} height={32} className={'loading-icon'}/>
        </div>
        <div className={'track-data selected'}>
            <div className={'track-name'}>
                <b>{author}</b>
                <span>{name}</span>
            </div>
        </div>
        {path && <audio ref={trackRef} crossOrigin={'use-credentials'}>
            <source src={path}/>
        </audio>}
        {!showPlaylists && <React.Fragment>
            <DragBar
                pos={!dragging ? played / duration * 100 : 0}
                onRatioUpdate={onRatioUpdate}
                onBarClick={onBarClick}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            />
            <div className={'track-duration'}>
                <span>{secondsToHuman(played)}</span>
                <span>{secondsToHuman(duration)}</span>
            </div>
            <div className={'track-controls'}>
                <Button disabled={!canPlayPrev} onClick={prevTrack}>Prev</Button>
                <Button disabled={!playing} onClick={stopTrack}>Stop</Button>
                <Button disabled={playing || typeof id === 'undefined'} onClick={startTrack}>Start</Button>
                <Button disabled={!canPlayNext} onClick={nextTrack}>Next</Button>
            </div>
            <div className={'track-controls'}>
                <Button disabled={!id} onClick={addToPlaylistButtonClickHandler}>Добавить в плейлист</Button>
                <Button disabled>Пожаловаться</Button>
                <Button disabled={!id} onClick={openQueue}>Очередь</Button>
            </div>
        </React.Fragment>}
        {showPlaylists && <React.Fragment>
            <Title style={{margin: '8px 0'}}>Выберите плейлист</Title>
            <List>
                {playlists.length < 1 && <img alt={'Загрузка'} src={icon_loading}/>}
                {playlists.map(r =>
                    <Cell
                        onDoubleClick={onCellDoubleClick(r.id)}
                        before={<IconSmall src={icon_dir}/>}
                        key={r.id}>
                        {r.name}
                    </Cell>)}
            </List>
            <div className={'track-controls'}>
                <Button onClick={closeButtonClickHandler} disabled={!id}>Отмена</Button>
            </div>
        </React.Fragment>}
    </div>
}

export default Player