import {PlayerAction, PlayerActionTypes} from "../Reducers/player";
import {Dispatch} from "react";
import {TRACK_DATA_LOCATION} from "../../config";
import $api from "../../http";
import TrackSchema from "../../Schemas/track.schema";

export const PlayerSetTrack = (id: string | TrackSchema) => {
    return (dispatch: Dispatch<PlayerAction>) => {
        if(typeof id === 'string') $api.get(TRACK_DATA_LOCATION + id)
            .then(r => dispatch({type: PlayerActionTypes.SET_TRACK, payload: {...r.data, random: Math.random()}}))
        else {
            const a = {...id}
            if(!('random' in a)) a.random = Math.random()
            dispatch({type: PlayerActionTypes.SET_TRACK, payload: a})
        }
    }
}

export const PlayerAddQueue = (id: string | TrackSchema) => {
    return (dispatch: Dispatch<PlayerAction>) => {
        if(typeof id === 'string') $api.get(TRACK_DATA_LOCATION + id)
            .then(r => dispatch({type: PlayerActionTypes.ADD_QUEUE, payload: {...r.data, random: Math.random()}}))
        else {
            const a = {...id}
            if(!('random' in a)) a.random = Math.random()
            dispatch({type: PlayerActionTypes.ADD_QUEUE, payload: a})
        }
    }
}

export const PlayerClearQueue = () => {
    return (dispatch: Dispatch<PlayerAction>) => {
        dispatch({type: PlayerActionTypes.CLEAR_QUEUE})
    }
}

export const PlayerRemoveFromQueue = (id: string, random: number) => {
    return (dispatch: Dispatch<PlayerAction>) => {
        dispatch({type: PlayerActionTypes.REMOVE_FROM_QUEUE, payload: {id, random}})
    }
}

export const PlayerSetAutoPlay = (p: boolean) => {
    return (dispatch: Dispatch<PlayerAction>) => {
        dispatch({type: PlayerActionTypes.SET_AUTOPLAY, payload: p})
    }
}