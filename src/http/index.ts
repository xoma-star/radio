import axios from "axios";
import {AUTH_LOCATION} from "../config";
import {AuthResponse} from "./Response/AuthResponse";
import {store} from "../Redux";
import {UI_ActionTypes, UI_Windows} from "../Redux/Reducers/ui";

const $api = axios.create({
    withCredentials: true,
})

$api.interceptors.request.use((config) => {
    if(config?.headers) config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
})

$api.interceptors.response.use((config) => config, async (error) => {
    if(error.response?.data?.statusCode === 401){
        try {
            const res = await $api.get<AuthResponse>(AUTH_LOCATION + 'refresh', {withCredentials: true})
            localStorage.setItem('accessToken', res.data.accessToken)
            return $api.request(error.config)
        }catch (e: any) {

        }
    }
    store.dispatch({type: UI_ActionTypes.SET_WARNING, payload: error?.response?.data?.message})
    store.dispatch({type: UI_ActionTypes.OPEN_WINDOW, payload: UI_Windows.WARNING})
    throw error
})

export default $api