import { PLAYLIST_DATA_LOCATION } from "../../config";
import $api from "../index";
import {AxiosResponse} from "axios";
import PlaylistSchema from "../../Schemas/playlist.schema";

export default class PlaylistService{
    static async create(name: string, isPublic: boolean): Promise<AxiosResponse<PlaylistSchema>>{
        return $api.post(PLAYLIST_DATA_LOCATION + 'create', {name, isPublic})
    }

    static async add(trackId: string, playlistId: string): Promise<AxiosResponse<PlaylistSchema>>{
        return $api.post(PLAYLIST_DATA_LOCATION + 'add', {trackId, playlistId})
    }

    static async getOne(playlist: string): Promise<AxiosResponse<PlaylistSchema>>{
        return $api.get(PLAYLIST_DATA_LOCATION + playlist)
    }

    static async removeTrack(trackId: string, playlistId: string): Promise<AxiosResponse<PlaylistSchema>>{
        return $api.post(PLAYLIST_DATA_LOCATION + 'removeTrack', {trackId, playlistId})
    }

    static async delete(playlistId: string): Promise<AxiosResponse<string | {statusCode: number, message: string}>>{
        return $api.post(PLAYLIST_DATA_LOCATION + 'delete', {playlistId})
    }

    static async getCurated(): Promise<AxiosResponse<PlaylistSchema[]>>{
        return $api.get(PLAYLIST_DATA_LOCATION + 'curated')
    }

    static async rename(playlistId: string, name: string, isPublic: boolean): Promise<AxiosResponse<PlaylistSchema>>{
        return $api.post(PLAYLIST_DATA_LOCATION + 'rename', {playlistId, newName: name, isPublic})
    }

    static async getRandom(count: number): Promise<AxiosResponse<PlaylistSchema[]>>{
        return $api.get(PLAYLIST_DATA_LOCATION + 'random?count=' + count)
    }
}