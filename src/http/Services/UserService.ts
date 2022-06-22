import $api from "../index";
import {USER_DATA_LOCATION} from "../../config";
import {AxiosResponse} from "axios";
import PlaylistSchema from "../../Schemas/playlist.schema";

export default class UserService{
    static async getUserPlaylists(): Promise<AxiosResponse<PlaylistSchema[]>>{
        return $api.get(USER_DATA_LOCATION + 'playlists')
    }

    static async savePlaylist(playlist: string): Promise<AxiosResponse<string[]>>{
        return $api.post(USER_DATA_LOCATION + 'addPlaylist', {playlist})
    }
}