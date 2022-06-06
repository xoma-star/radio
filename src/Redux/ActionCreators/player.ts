import {PlayerAction, PlayerActionTypes, track} from "../Reducers/player";
import {Dispatch} from "react";
import {TRACK_DATA_LOCATION} from "../../config";

export const PlayerSetTrack = (id: string | track) => {
    return (dispatch: Dispatch<PlayerAction>) => {
        if(typeof id === 'string') fetch(TRACK_DATA_LOCATION + id)
            .then(r => r.json())
            .then(json => dispatch({type: PlayerActionTypes.SET_TRACK, payload: {...json, ts: new Date().getTime()}}))
        else {
            dispatch({type: PlayerActionTypes.SET_TRACK, payload: id})
        }
    }
}

export const PlayerAddQueue = (id: string) => {
    return (dispatch: Dispatch<PlayerAction>) => {
        fetch(TRACK_DATA_LOCATION + id)
            .then(r => r.json())
            .then(json => dispatch({type: PlayerActionTypes.ADD_QUEUE, payload: {...json, ts: new Date().getTime()}}))
    }
}

export const PlayerClearQueue = () => {
    return (dispatch: Dispatch<PlayerAction>) => {
        dispatch({type: PlayerActionTypes.CLEAR_QUEUE})
    }
}