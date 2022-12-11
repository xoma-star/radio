import {Dispatch} from "react";
import {UI_Action, UI_ActionTypes, UI_Windows, warnMessage} from "../Reducers/ui";


export const UI_OpenWindow = (p: UI_Windows, h: boolean = true) => {
    return (dispatch: Dispatch<UI_Action>) => {
        dispatch({type: UI_ActionTypes.OPEN_WINDOW, payload: {window: p, history: h}})
    }
}
export const UI_MinimizeWindow = (p: UI_Windows, force?: boolean) => {
    return (dispatch: Dispatch<UI_Action>) => {
        dispatch({type: UI_ActionTypes.MINIMIZE_WINDOW, payload: {p: p, force: force}})
    }
}
export const UI_CloseWindow = (p: UI_Windows, h: boolean = true) => {
    return (dispatch: Dispatch<UI_Action>) => {
        dispatch({type: UI_ActionTypes.CLOSE_WINDOW, payload: {window: p, history: h}})
    }
}
export const UI_SetActiveWindow = (p: UI_Windows | null, h: boolean = true) => {
    return (dispatch: Dispatch<UI_Action>) => {
        dispatch({type: UI_ActionTypes.SET_ACTIVE_WINDOW, payload: {window: p, history: h}})
    }
}

export const UI_Warn = (p: warnMessage | null | string) => {
    return (dispatch: Dispatch<UI_Action>) => {
        dispatch({type: UI_ActionTypes.SET_WARNING, payload: p})
        if(p === null) dispatch({type: UI_ActionTypes.CLOSE_WINDOW, payload: {window: UI_Windows.WARNING, history: false}})
        else dispatch({type: UI_ActionTypes.OPEN_WINDOW, payload: {window: UI_Windows.WARNING, history: false}})
    }
}

export const UI_SetConnectionStatus = (p: 'online' | 'offline') => {
    return (dispatch: Dispatch<UI_Action>) => dispatch({type: UI_ActionTypes.SET_CONNECTION_STATUS, payload: p})
}

export const UI_SetBackground = (p: string) => {
    localStorage.setItem('background', p)
    return (dispatch: Dispatch<UI_Action>) => dispatch({type: UI_ActionTypes.SET_BACKGROUND, payload: p})
}

export const UI_SetVKClient = (p: boolean) => {
    return (dispatch: Dispatch<UI_Action>) => dispatch({type: UI_ActionTypes.SET_VK_CLIENT, payload: p})
}

export const UI_SetSnowing = (p: boolean) => {
    return (dispatch: Dispatch<UI_Action>) => dispatch({type: UI_ActionTypes.SET_SNOWING, payload: p})
}