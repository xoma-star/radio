import {Dispatch} from "react";
import {UI_Windows, UI_Action, UI_ActionTypes} from "../Reducers/ui";


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