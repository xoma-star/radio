import {PlayerAction, PlayerActionTypes, track} from "../Reducers/player";
import {Dispatch} from "react";
import {TRACK_DATA_LOCATION} from "../../config";
import $api from "../../http";

export const PlayerSetTrack = (id: string | track) => {
    return (dispatch: Dispatch<PlayerAction>) => {
        if(typeof id === 'string') $api.get(TRACK_DATA_LOCATION + id)
            .then(r => dispatch({type: PlayerActionTypes.SET_TRACK, payload: {...r.data, ts: new Date().getTime()}}))
        else {
            dispatch({type: PlayerActionTypes.SET_TRACK, payload: id})
        }
    }
}

export const PlayerAddQueue = (id: string) => {
    return (dispatch: Dispatch<PlayerAction>) => {
        $api.get(TRACK_DATA_LOCATION + id)
            .then(r => dispatch({type: PlayerActionTypes.ADD_QUEUE, payload: {...r.data, ts: new Date().getTime()}}))
    }
}

export const PlayerClearQueue = () => {
    return (dispatch: Dispatch<PlayerAction>) => {
        dispatch({type: PlayerActionTypes.CLEAR_QUEUE})
    }
}