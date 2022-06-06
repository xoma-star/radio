import {UI_Reducer} from './ui'
import {PlayerReducer} from './player'
import {combineReducers} from "redux";

export const rootReducer = combineReducers({
    ui: UI_Reducer,
    player: PlayerReducer
})