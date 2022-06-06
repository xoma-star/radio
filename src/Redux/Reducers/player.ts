import {Ref} from "react";
import {SERVER_LOCATION} from "../../config";

export interface track{
    id: string,
    path: string,
    name: string,
    author: string,
    cover: string,
    ts: number
}

interface State{
    interval?: typeof setInterval,
    path?: string,
    cover?: string,
    author?: string,
    name?: string,
    id?: string,
    ts?: number,
    audioRef?: Ref<HTMLAudioElement>,
    queue: track[]
}

export enum PlayerActionTypes{
    SET_AUDIO = 'SET_AUDIO',
    SET_TRACK = 'SET_TRACK',
    ADD_QUEUE = 'ADD_QUEUE',
    CLEAR_QUEUE = 'CLEAR_QUEUE',
    REMOVE_FROM_QUEUE = 'REMOVE_FROM_QUEUE'
}

const defaultState: State = {
    queue: []
}


interface SetAudioAction{
    type: PlayerActionTypes.SET_AUDIO,
    payload: string
}

interface SetTrackAction{
    type: PlayerActionTypes.SET_TRACK | PlayerActionTypes.ADD_QUEUE,
    payload: track
}

interface ClearQueue{
    type: PlayerActionTypes.CLEAR_QUEUE
}

export type PlayerAction = SetAudioAction | SetTrackAction | ClearQueue

export const PlayerReducer = (state: State = defaultState, action: PlayerAction): State => {
    switch (action.type){
        case PlayerActionTypes.SET_TRACK:
            let c = {...action.payload,
                path: action.payload.path.indexOf('http') < 0 ? SERVER_LOCATION + action.payload.path : action.payload.path,
                cover: action.payload.cover.indexOf('http') < 0 ? SERVER_LOCATION + action.payload.cover : action.payload.cover}
            return {...state, ...c, queue: (state.queue.length === 0 ? [c] : state.queue)}
        case PlayerActionTypes.ADD_QUEUE: {
            let a = {...state}
            const b = {...action.payload,
                path: SERVER_LOCATION + action.payload.path,
                cover: SERVER_LOCATION + action.payload.cover}
            if(a.queue.length === 0) a = {
                ...a,
                ...b
            }
            a.queue = [...a.queue, b]
            return a
        }
        case PlayerActionTypes.CLEAR_QUEUE: return {...state, queue: []}
        default: return state
    }
}

