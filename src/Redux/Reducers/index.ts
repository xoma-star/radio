import {UI_Reducer} from './ui'
import {PlayerReducer} from './player'
import {combineReducers} from "redux";
import {UserReducer} from "./user";

export const rootReducer = combineReducers({
    ui: UI_Reducer,
    player: PlayerReducer,
    user: UserReducer
})