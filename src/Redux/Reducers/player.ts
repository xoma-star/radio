import {FILES_LOCATION} from "../../config";
import TrackSchema from "../../Schemas/track.schema";

interface State{
    path?: string,
    cover?: string,
    author?: string,
    name?: string,
    id?: string,
    random?: number,
    queue: TrackSchema[],
    autoplay: boolean,
}

export enum PlayerActionTypes{
    SET_AUDIO = 'SET_AUDIO',
    SET_TRACK = 'SET_TRACK',
    ADD_QUEUE = 'ADD_QUEUE',
    CLEAR_QUEUE = 'CLEAR_QUEUE',
    REMOVE_FROM_QUEUE = 'REMOVE_FROM_QUEUE',
    SET_AUTOPLAY = 'SET_AUTOPLAY',
}

const defaultState: State = {
    queue: [],
    autoplay: true
}


interface SetAudioAction{
    type: PlayerActionTypes.SET_AUDIO,
    payload: string
}

interface SetTrackAction{
    type: PlayerActionTypes.SET_TRACK | PlayerActionTypes.ADD_QUEUE,
    payload: TrackSchema
}

interface RemoveFromQueueAction{
    type: PlayerActionTypes.REMOVE_FROM_QUEUE,
    payload: {id: string, random: number}
}

interface ClearQueue{
    type: PlayerActionTypes.CLEAR_QUEUE
}

interface AutoPlay{
    type: PlayerActionTypes.SET_AUTOPLAY,
    payload: boolean
}

export type PlayerAction = SetAudioAction | SetTrackAction | ClearQueue | RemoveFromQueueAction | AutoPlay

export const PlayerReducer = (state: State = defaultState, action: PlayerAction): State => {
    let a, b
    switch (action.type){
        case PlayerActionTypes.SET_TRACK:
            a = {
                ...action.payload,
                path: action.payload.path.indexOf('http') < 0 ? FILES_LOCATION + action.payload.path : action.payload.path,
                cover: action.payload.cover.indexOf('http') < 0 ? FILES_LOCATION + action.payload.cover : action.payload.cover
            }
            return {...state, ...a, queue: (state.queue.length === 0 ? [a] : state.queue)}
        case PlayerActionTypes.ADD_QUEUE: {
            a = {...state}
            // if(state.queue.findIndex(x => x.id ===action.payload.id) >= 0) return state
            b = {
                ...action.payload,
                path: FILES_LOCATION + action.payload.path,
                cover: FILES_LOCATION + action.payload.cover
            }
            if(a.queue.length === 0) a = {
                ...a,
                ...b
            }
            a.queue = [...a.queue, b]
            return a
        }
        case PlayerActionTypes.CLEAR_QUEUE: return {...state, queue: [], path: undefined, id: undefined, cover: undefined, name: undefined, author: undefined, random: undefined}
        case PlayerActionTypes.REMOVE_FROM_QUEUE:
            a = [...state.queue]
            b = a.findIndex(x => x.id === action.payload.id && x.random === action.payload.random)
            a.splice(b, 1)
            return {...state, queue: a}
        case PlayerActionTypes.SET_AUTOPLAY: return {...state, autoplay: action.payload}
        default: return state
    }
}

