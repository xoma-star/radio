import {Dispatch} from "react";
import {PlaylistAction, PlaylistActionTypes} from "../Reducers/playlist";
import PlaylistSchema from "../../Schemas/playlist.schema";
import PlaylistService from "../../http/Services/PlaylistService";

export const PlaylistSetOverview = (p: string | 'create' | null | PlaylistSchema) => {
    return (dispatch: Dispatch<PlaylistAction>) => {
        if(typeof p === 'string' && p !== 'create') PlaylistService.getOne(p)
            .then(r => dispatch({type: PlaylistActionTypes.SET_OVERVIEW, payload: r.data}))
            .catch(r => console.log(r))
        else if(p === null || p === 'create') dispatch({type: PlaylistActionTypes.SET_OVERVIEW, payload: p})
        else dispatch({type: PlaylistActionTypes.SET_OVERVIEW, payload: p})
    }
}