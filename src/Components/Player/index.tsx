import React from "react"
import './Player.css'
import DragBar from "../DragBar";
import usePlayer from "../../Hooks/usePlayer";
import secondsToHuman from "../../Functions/secondsToHuman";
import Button from "../Common/Button";
import {icon_loading} from "../../Images/Icons";

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
        loading
    } = usePlayer()

    return <div className={'player-wrapper'}>
        <div className={`cover selected${loading ? ' tinted' : ''}`} style={{'--cover': `url(${cover})`} as React.CSSProperties}>
            <img alt={'Loading...'} src={icon_loading} width={32} height={32} className={'loading-icon'}/>
        </div>
        <div className={'track-data selected'}>
            <div className={'track-name'}>
                <b>{author}</b>
                <span>{name}</span>
            </div>
        </div>
        {path && <audio ref={trackRef}>
            <source src={path}/>
        </audio>}
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
    </div>
}

export default Player