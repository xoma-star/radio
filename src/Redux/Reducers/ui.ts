export enum UI_ActionTypes{
    OPEN_WINDOW = 'OPEN_WINDOW',
    CLOSE_WINDOW = 'CLOSE_WINDOW',
    MINIMIZE_WINDOW = 'MINIMIZE_WINDOW',
    SET_ACTIVE_WINDOW = 'SET_ACTIVE_WINDOW',
    SET_WARNING = 'SET_WARNING',
    SET_CONNECTION_STATUS = 'SET_CONNECTION_STATUS',
    SET_BACKGROUND = 'SET_BACKGROUND',
    SET_VK_CLIENT = 'SET_VK_CLIENT',
    SET_SNOWING = 'SET_SNOWING'
}

export type warnMessage = null | {text: string, type: 'success' | 'warning' | 'error'}

export enum UI_Windows{
    MUSIC_FOLDER = 'library',
    MUSIC_PLAYER = 'player',
    FILE_UPLOAD = 'upload',
    LOGIN = 'auth',
    WARNING = 'WARNING',
    NAVIGATOR = 'navigator',
    PLAYLIST = 'playlist',
    QUEUE = 'queue',
    APPEARANCE = 'appearance',
    HELP = 'help',
    ABOUT = 'about',
    SEARCH = 'search'
}

const ignoreWebHistory = [
    UI_Windows.WARNING
]

interface State{
    opened: UI_Windows[],
    minimized: { [key in UI_Windows]?: boolean },
    layoutPos: {[key in UI_Windows]?: number}
    activeWindow: UI_Windows | null,
    warning: warnMessage,
    connectionStatus: 'online' | 'offline',
    background: string,
    isVKClient: boolean,
    isSnowing: boolean
}

interface UI_Window{
    type: UI_ActionTypes.OPEN_WINDOW | UI_ActionTypes.CLOSE_WINDOW,
    payload: {window: UI_Windows, history: boolean}
}

interface UI_VK{
    type: UI_ActionTypes.SET_VK_CLIENT,
    payload: boolean
}

interface UI_Active{
    type: UI_ActionTypes.SET_ACTIVE_WINDOW,
    payload: {
        window: UI_Windows | null,
        history: boolean
    }
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
    payload: warnMessage | string
}

interface UI_Connection{
    type: UI_ActionTypes.SET_CONNECTION_STATUS,
    payload: 'online' | 'offline'
}

interface UI_Background{
    type: UI_ActionTypes.SET_BACKGROUND,
    payload: string
}

interface UI_SetSnowing{
    type: UI_ActionTypes.SET_SNOWING,
    payload: boolean
}

export type UI_Action = UI_Window | UI_Active | UI_Minimize | UI_Warn | UI_Connection | UI_Background | UI_VK | UI_SetSnowing

const defaultState: State = {
    opened: [],
    minimized: {},
    activeWindow: null,
    layoutPos: {},
    warning: null,
    connectionStatus: 'offline',
    background: localStorage.getItem('background') || '#008080',
    isVKClient: false,
    isSnowing: false
}

export const UI_Reducer = (state: State = defaultState, action: UI_Action): State => {
    let a, b, c, d
    switch (action.type){
        case UI_ActionTypes.OPEN_WINDOW:
            if(state.opened.indexOf(action.payload.window) < 0) a = {...state, opened: [...state.opened, action.payload.window]}
            else a = {...state}
            a.minimized[action.payload.window] = false
            a.activeWindow = action.payload.window
            let f = Math.max(...Object.values(state.layoutPos)) + 1
            a.layoutPos[action.payload.window] = f > 0 ? f : 0
            if(action.payload.history && ignoreWebHistory.indexOf(action.payload.window) < 0) window.history.pushState({window: action.payload.window}, '', `/${action.payload.window}`)
            return a
        case UI_ActionTypes.MINIMIZE_WINDOW:
            a = {...state.minimized}
            if(typeof action.payload.force !== 'undefined') a[action.payload.p] = action.payload.force
            else a[action.payload.p] = !a[action.payload.p]
            return {...state, minimized: a}
        case UI_ActionTypes.CLOSE_WINDOW:
            d = state.opened.indexOf(action.payload.window)
            if(d < 0) return state
            b = [...state.opened]
            c = {...state.minimized}
            a = {...state.layoutPos}
            delete c[action.payload.window]
            delete a[action.payload.window]
            b.splice(d, 1)
            if(state.activeWindow)window.history.replaceState({window: null}, '', `/`)
            return {...state, opened: b, minimized: c, layoutPos: a, activeWindow: null}
        case UI_ActionTypes.SET_ACTIVE_WINDOW:
            a = {...state.layoutPos}
            if(action.payload.window !== null) {
                a[action.payload.window] = Math.max(...Object.values(state.layoutPos)) + 1
                if(action.payload.history && ignoreWebHistory.indexOf(action.payload.window) < 0 && action.payload.window !== state.activeWindow)
                    window.history.pushState({window: action.payload.window}, '', `/${action.payload.window}`)
            }
            else if(action.payload.history) window.history.pushState({window: null}, '', `/`)
            return {...state,
                activeWindow: action.payload.window,
                layoutPos: a
            }
        case UI_ActionTypes.SET_WARNING:
            if(action.payload === null) return {...state, warning: null}
            if(typeof action.payload === 'string') return {...state, warning: {type: "warning", text: action.payload}}
            a = {...action.payload}
            if(!a.type) a.type = 'warning'
            if(!a.text) a.text = 'Неизвестная ошибка'
            return {...state, warning: a}
        case UI_ActionTypes.SET_CONNECTION_STATUS: return {...state, connectionStatus: action.payload}
        case UI_ActionTypes.SET_BACKGROUND: return {...state, background: action.payload}
        case UI_ActionTypes.SET_VK_CLIENT: return {...state, isVKClient: action.payload}
        case UI_ActionTypes.SET_SNOWING:
            localStorage.setItem('isSnowing', action.payload.toString())
            return {...state, isSnowing: action.payload}
        default: return state
    }
}
