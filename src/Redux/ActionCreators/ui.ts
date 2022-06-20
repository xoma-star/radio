import {Dispatch} from "react";
import {UI_Action, UI_ActionTypes, UI_Windows, warnMessage} from "../Reducers/ui";


export const UI_OpenWindow = (p: UI_Windows) => {
    return (dispatch: Dispatch<UI_Action>) => {
        dispatch({type: UI_ActionTypes.OPEN_WINDOW, payload: p})
    }
}
export const UI_MinimizeWindow = (p: UI_Windows, force?: boolean) => {
    return (dispatch: Dispatch<UI_Action>) => {
        dispatch({type: UI_ActionTypes.MINIMIZE_WINDOW, payload: {p: p, force: force}})
    }
}
export const UI_CloseWindow = (p: UI_Windows) => {
    return (dispatch: Dispatch<UI_Action>) => {
        dispatch({type: UI_ActionTypes.CLOSE_WINDOW, payload: p})
    }
}
export const UI_SetActiveWindow = (p: UI_Windows | null) => {
    return (dispatch: Dispatch<UI_Action>) => {
        dispatch({type: UI_ActionTypes.SET_ACTIVE_WINDOW, payload: p})
    }
}

export const UI_Warn = (p: warnMessage | null | string) => {
    return (dispatch: Dispatch<UI_Action>) => {
        dispatch({type: UI_ActionTypes.SET_WARNING, payload: p})
        if(p === null) dispatch({type: UI_ActionTypes.CLOSE_WINDOW, payload: UI_Windows.WARNING})
        else dispatch({type: UI_ActionTypes.OPEN_WINDOW, payload: UI_Windows.WARNING})
    }
}

export const UI_SetConnectionStatus = (p: 'online' | 'offline') => {
    return (dispatch: Dispatch<UI_Action>) => dispatch({type: UI_ActionTypes.SET_CONNECTION_STATUS, payload: p})
}