import {Dispatch} from "react";
import {PlaylistAction, PlaylistActionTypes} from "../Reducers/playlist";

export const PlaylistSetOverview = (p: string | 'create' | null) => {
    return (dispatch: Dispatch<PlaylistAction>) => {
        dispatch({type: PlaylistActionTypes.SET_OVERVIEW, payload: p})
    }
}