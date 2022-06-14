import { PLAYLIST_DATA_LOCATION } from "../../config";
import $api from "../index";

export default class PlaylistService{
    static async create(name: string, isPublic: boolean){
        return $api.post(PLAYLIST_DATA_LOCATION + 'create', {name, isPublic})
    }

    static async add(trackId: string, playlistId: string){
        return $api.post(PLAYLIST_DATA_LOCATION + 'add', {trackId, playlistId})
    }
}