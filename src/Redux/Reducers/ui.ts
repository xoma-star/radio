export enum UI_ActionTypes{
    OPEN_WINDOW = 'OPEN_WINDOW',
    CLOSE_WINDOW = 'CLOSE_WINDOW',
    MINIMIZE_WINDOW = 'MINIMIZE_WINDOW',
    SET_ACTIVE_WINDOW = 'SET_ACTIVE_WINDOW',
    SET_WARNING = 'SET_WARNING'
}

export enum UI_Windows{
    MUSIC_FOLDER = 'MUSIC_FOLDER',
    MUSIC_PLAYER = 'MUSIC_PLAYER',
    FILE_UPLOAD = 'FILE_UPLOAD',
    LOGIN = 'LOGIN',
    WARNING = 'WARNING'
}

interface State{
    opened: UI_Windows[],
    minimized: { [key in UI_Windows]?: boolean },
    layoutPos: {[key in UI_Windows]?: number}
    activeWindow: UI_Windows | null,
    warning: null | string
}

interface UI_Window{
    type: UI_ActionTypes.OPEN_WINDOW | UI_ActionTypes.CLOSE_WINDOW,
    payload: UI_Windows
}

interface UI_Active{
    type: UI_ActionTypes.SET_ACTIVE_WINDOW,
    payload: UI_Windows | null
}

interface UI_Minimize{
    type: UI_ActionTypes.MINIMIZE_WINDOW,
    payload: {
        p: UI_Windows,
        force?: boolean
    }
}

interface UI_Warn{
    type: UI_ActionTypes.SET_WARNING,
    payload: string | null
}

export type UI_Action = UI_Window | UI_Active | UI_Minimize | UI_Warn

const defaultState: State = {
    opened: [],
    minimized: {},
    activeWindow: null,
    layoutPos: {},
    warning: null
}

export const UI_Reducer = (state: State = defaultState, action: UI_Action): State => {
    switch (action.type){
        case UI_ActionTypes.OPEN_WINDOW:
            let e
            if(state.opened.indexOf(action.payload) < 0) e = {...state, opened: [...state.opened, action.payload]}
            else e = {...state}
            e.minimized[action.payload] = false
            e.activeWindow = action.payload
            let f = Math.max(...Object.values(state.layoutPos)) + 1
            e.layoutPos[action.payload] = f > 0 ? f : 0
            return e
        case UI_ActionTypes.MINIMIZE_WINDOW:
            let a = {...state.minimized}
            if(typeof action.payload.force !== 'undefined') a[action.payload.p] = action.payload.force
            else a[action.payload.p] = !a[action.payload.p]
            return {...state, minimized: a}
        case UI_ActionTypes.CLOSE_WINDOW:
            let i = state.opened.indexOf(action.payload)
            if(i < 0) return state
            let b = [...state.opened]
            let c = {...state.minimized}
            delete c[action.payload]
            b.splice(i,1)
            return {...state, opened: b}
        case UI_ActionTypes.SET_ACTIVE_WINDOW:
            let d = {...state.layoutPos}
            if(action.payload !== null) d[action.payload] = Math.max(...Object.values(state.layoutPos)) + 1
            return {...state,
            activeWindow: action.payload,
            layoutPos: d}
        case UI_ActionTypes.SET_WARNING: return {...state, warning: action.payload}
        default: return state
    }
}