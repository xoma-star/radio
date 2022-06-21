import {PlayerAction, PlayerActionTypes} from "../Reducers/player";
import {Dispatch} from "react";
import {TRACK_DATA_LOCATION} from "../../config";
import $api from "../../http";
import TrackSchema from "../../Schemas/track.schema";

export const PlayerSetTrack = (id: string | TrackSchema) => {
    return (dispatch: Dispatch<PlayerAction>) => {
        if(typeof id === 'string') $api.get(TRACK_DATA_LOCATION + id)
            .then(r => dispatch({type: PlayerActionTypes.SET_TRACK, payload: {...r.data, ts: new Date().getTime()}}))
        else {
            dispatch({type: PlayerActionTypes.SET_TRACK, payload: {...id, ts: new Date().getTime()}})
        }
    }
}

export const PlayerAddQueue = (id: string | TrackSchema) => {
    return (dispatch: Dispatch<PlayerAction>) => {
        if(typeof id === 'string') $api.get(TRACK_DATA_LOCATION + id)
            .then(r => dispatch({type: PlayerActionTypes.ADD_QUEUE, payload: {...r.data, ts: new Date().getTime()}}))
        else dispatch({type: PlayerActionTypes.ADD_QUEUE, payload: {...id, ts: new Date().getTime()}})
    }
}

export const PlayerClearQueue = () => {
    return (dispatch: Dispatch<PlayerAction>) => {
        dispatch({type: PlayerActionTypes.CLEAR_QUEUE})
    }
}

export const PlayerRemoveFromQueue = (p: string) => {
    return (dispatch: Dispatch<PlayerAction>) => {
        dispatch({type: PlayerActionTypes.REMOVE_FROM_QUEUE, payload: p})
    }
}