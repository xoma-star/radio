interface State{
    name?: string,
    id?: string,
    overview?: string | 'create' | null
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
    payload: string | 'create' | null
}

export type PlaylistAction = PlaylistStringAction | PlaylistOverviewAction

const defaultState: State = {
    overview: null
}

export const PlaylistReducer = (state: State = defaultState, action: PlaylistAction): State => {
    switch (action.type){
        case PlaylistActionTypes.SET_ID: return {...state, id: action.payload}
        case PlaylistActionTypes.SET_NAME: return {...state, name: action.payload}
        case PlaylistActionTypes.SET_OVERVIEW: return {...state, overview: action.payload}
        default: return state
    }
}