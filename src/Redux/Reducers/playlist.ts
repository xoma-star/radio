import PlaylistSchema from "../../Schemas/playlist.schema";
import {UI_Windows} from "./ui";

interface State{
    name?: string,
    id?: string,
    overview?: PlaylistSchema | 'create' | null
}

export enum PlaylistActionTypes{
    'SET_NAME' = 'SET_NAME',
    'SET_ID' = 'SET_ID',
    'SET_OVERVIEW' = 'SET_OVERVIEW'
}

interface PlaylistStringAction{
    type: PlaylistActionTypes.SET_ID | PlaylistActionTypes.SET_NAME,
    payload: string
}
interface PlaylistOverviewAction{
    type: PlaylistActionTypes.SET_OVERVIEW,
    payload: 'create' | null | PlaylistSchema
}

export type PlaylistAction = PlaylistStringAction | PlaylistOverviewAction

const defaultState: State = {
    overview: null
}

export const PlaylistReducer = (state: State = defaultState, action: PlaylistAction): State => {
    switch (action.type){
        case PlaylistActionTypes.SET_ID: return {...state, id: action.payload}
        case PlaylistActionTypes.SET_NAME: return {...state, name: action.payload}
        case PlaylistActionTypes.SET_OVERVIEW:
            if(action.payload){
                if(action.payload === 'create') window.history
                    .replaceState({window: UI_Windows.PLAYLIST, overview: action.payload}, '', `/${UI_Windows.PLAYLIST}/create`)
                else window.history
                    .replaceState({window: UI_Windows.PLAYLIST, overview: action.payload}, '', `/${UI_Windows.PLAYLIST}/${action.payload.id}`)
            } else action.payload = null
            return {...state, overview: action.payload}
        default: return state
    }
}