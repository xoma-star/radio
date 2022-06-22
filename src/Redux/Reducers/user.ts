import PlaylistSchema from "../../Schemas/playlist.schema";

interface State {
    authorized: boolean,
    id: string | null,
    playlists: PlaylistSchema[]
}

export enum UserActionTypes{
    SET_AUTHORIZED = "SET_AUTHORIZED",
    SET_ID = "SET_ID",
    SET_PLAYLISTS = "SET_PLAYLISTS"
}

const defaultState: State = {
    authorized: false,
    id: null,
    playlists: []
}

interface AuthorizedAction{
    type: UserActionTypes.SET_AUTHORIZED,
    payload: boolean
}

interface StringNullAction {
    type: UserActionTypes.SET_ID,
    payload: string | null
}

interface PlaylistAction {
    type: UserActionTypes.SET_PLAYLISTS,
    payload: PlaylistSchema[]
}

export type UserAction = AuthorizedAction | StringNullAction | PlaylistAction

export const UserReducer = (state: State = defaultState, action: UserAction) => {
    switch (action.type){
        case UserActionTypes.SET_AUTHORIZED: return {...state, authorized: action.payload}
        case UserActionTypes.SET_ID: return {...state, id: action.payload}
        case UserActionTypes.SET_PLAYLISTS: return {...state, playlists: action.payload}
        default: return state
    }
}