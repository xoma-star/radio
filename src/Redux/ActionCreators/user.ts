import {UserAction, UserActionTypes} from "../Reducers/user";
import {Dispatch} from "react";
import AuthService from "../../http/Services/AuthService";
import axios from "axios";
import {AUTH_LOCATION} from "../../config";
import {AuthResponse} from "../../http/Response/AuthResponse";

export const Login = (name: string, password: string, onSuccess: () => void, onError: (e: string) => void) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const res = await AuthService.login(name, password)
            localStorage.setItem('accessToken', res?.data?.accessToken)
            dispatch({type: UserActionTypes.SET_AUTHORIZED, payload: true})
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
            onSuccess()
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
        }catch (e) {

        }
    }
}

export const CheckAuth = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const res = await axios.get<AuthResponse>(AUTH_LOCATION + 'refresh', {withCredentials: true})
            localStorage.setItem('accessToken', res.data.accessToken)
            dispatch({type: UserActionTypes.SET_AUTHORIZED, payload: true})
        }catch (e) {

        }
    }
}