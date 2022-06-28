import {UserAction, UserActionTypes} from "../Reducers/user";
import {Dispatch} from "react";
import AuthService from "../../http/Services/AuthService";
import axios from "axios";
import {AUTH_LOCATION} from "../../config";
import {AuthResponse} from "../../http/Response/AuthResponse";
import UserService from "../../http/Services/UserService";
import {UI_Action, UI_ActionTypes, UI_Windows} from "../Reducers/ui";
import bridge from "@vkontakte/vk-bridge";

export const Login = (name: string, password: string, onSuccess: () => void, onError: (e: string) => void) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const res = await AuthService.login(name, password)
            localStorage.setItem('accessToken', res?.data?.accessToken)
            dispatch({type: UserActionTypes.SET_AUTHORIZED, payload: true})
            dispatch({type: UserActionTypes.SET_ID, payload: res.data.id})
            onSuccess()
        }catch (e: any) {
            onError(e?.response?.data?.message)
        }
    }
}

export const Signup = (name: string, password: string, email: string, onSuccess: () => void, onError: (e: string) => void) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const res = await AuthService.signup(name, password, email)
            localStorage.setItem('accessToken', res.data.accessToken)
            dispatch({type: UserActionTypes.SET_AUTHORIZED, payload: true})
            dispatch({type: UserActionTypes.SET_ID, payload: res.data.id})
            onSuccess()
        }catch (e: any) {
            onError(e?.response?.data?.message)
        }
    }
}

export const LoginVK = (onSuccess: (password: string | null) => void, onError: (e: string) => void) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const {email, sign} = await bridge.send('VKWebAppGetEmail')
            const res = await AuthService.loginVK(email, sign)
            localStorage.setItem('accessToken', res.data.accessToken)
            dispatch({type: UserActionTypes.SET_AUTHORIZED, payload: true})
            dispatch({type: UserActionTypes.SET_ID, payload: res.data.id})
            onSuccess(res.data.password || null)
        }catch (e: any) {
            onError(e?.response?.data?.message)
        }
    }
}

export const Logout = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            await AuthService.logout()
            localStorage.removeItem('accessToken')
            dispatch({type: UserActionTypes.SET_AUTHORIZED, payload: false})
            dispatch({type: UserActionTypes.SET_ID, payload: null})
        }catch (e) {

        }
    }
}

export const CheckAuth = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            axios.get<AuthResponse>(AUTH_LOCATION + 'refresh', {withCredentials: true})
                .then(res => {
                    localStorage.setItem('accessToken', res.data.accessToken)
                    dispatch({type: UserActionTypes.SET_AUTHORIZED, payload: true})
                    dispatch({type: UserActionTypes.SET_ID, payload: res.data.id})
                })
                .catch()
        }catch (e) {
            dispatch({type: UserActionTypes.SET_AUTHORIZED, payload: false})
            dispatch({type: UserActionTypes.SET_ID, payload: null})
        }
    }
}

export const UserGetPlaylists = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const res = await UserService.getUserPlaylists()
            dispatch({type: UserActionTypes.SET_PLAYLISTS, payload: res.data})
        }catch (e) {}
    }
}