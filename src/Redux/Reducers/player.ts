import {FILES_LOCATION} from "../../config";
import TrackSchema from "../../Schemas/track.schema";

interface State{
    path?: string,
    cover?: string,
    author?: string,
    name?: string,
    id?: string,
    queue: TrackSchema[]
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
    payload: TrackSchema
}

interface RemoveFromQueueAction{
    type: PlayerActionTypes.REMOVE_FROM_QUEUE,
    payload: string
}

interface ClearQueue{
    type: PlayerActionTypes.CLEAR_QUEUE
}

export type PlayerAction = SetAudioAction | SetTrackAction | ClearQueue | RemoveFromQueueAction

export const PlayerReducer = (state: State = defaultState, action: PlayerAction): State => {
    switch (action.type){
        case PlayerActionTypes.SET_TRACK:
            let c = {...action.payload,
                path: action.payload.path.indexOf('http') < 0 ? FILES_LOCATION + action.payload.path : action.payload.path,
                cover: action.payload.cover.indexOf('http') < 0 ? FILES_LOCATION + action.payload.cover : action.payload.cover}
            return {...state, ...c, queue: (state.queue.length === 0 ? [c] : state.queue)}
        case PlayerActionTypes.ADD_QUEUE: {
            let a = {...state}
            if(state.queue.findIndex(x => x.id ===action.payload.id) >= 0) return state
            const b = {...action.payload,
                path: FILES_LOCATION + action.payload.path,
                cover: FILES_LOCATION + action.payload.cover}
            if(a.queue.length === 0) a = {
                ...a,
                ...b
            }
            a.queue = [...a.queue, b]
            return a
        }
        case PlayerActionTypes.CLEAR_QUEUE: return {...state, queue: [], path: undefined, id: undefined, cover: undefined, name: undefined, author: undefined}
        case PlayerActionTypes.REMOVE_FROM_QUEUE:
            let d = [...state.queue]
            const i = d.findIndex(x => x.id === action.payload)
            d.splice(i, 1)
            return {...state, queue: d}
        default: return state
    }
}

