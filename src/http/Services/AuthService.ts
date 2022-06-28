import $api from "../index";
import {AUTH_LOCATION} from "../../config";
import {AxiosResponse} from "axios";
import {AuthResponse} from "../Response/AuthResponse";

export default class AuthService{
    static async login(name: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>(AUTH_LOCATION + 'login', {name, password})
    }

    static async signup(name: string, password: string, email: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>(AUTH_LOCATION + 'signup', {name, email, password})
    }

    static async loginVK(email: string, sign: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post(AUTH_LOCATION + 'vk')
    }

    static async logout(): Promise<void>{
        return $api.get(AUTH_LOCATION + 'logout')
    }
}