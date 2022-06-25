import $api from "../index";
import {TRACK_DATA_LOCATION} from "../../config";
import TrackSchema from "../../Schemas/track.schema";
import {AxiosResponse} from "axios";

export default class TrackService{
    static async getTracks(): Promise<AxiosResponse<TrackSchema[]>>{
        return $api.get(TRACK_DATA_LOCATION)
    }
    static async getLatest(): Promise<AxiosResponse<TrackSchema[]>>{
        return $api.get(TRACK_DATA_LOCATION + 'latest')
    }
    static async uploadTrack(name: string, author: string, cover: string, audio: File){
        const data = new FormData()
        data.append('name', name)
        data.append('author', author)
        data.append('cover64', cover as string)
        data.append('audio', audio as File)
        return $api.post(TRACK_DATA_LOCATION + 'add', data)
    }
    static async getMultiple(tracks: string[]): Promise<AxiosResponse<TrackSchema[]>>{
        return $api.get(TRACK_DATA_LOCATION + 'getMultiple', {params: {tracks: tracks.join(',')}})
    }
    static async getRandom(count: number): Promise<AxiosResponse<TrackSchema[]>>{
        return $api.get(TRACK_DATA_LOCATION + 'random', {params: {count}})
    }
    static async getMostListened(): Promise<AxiosResponse<TrackSchema[]>>{
        return $api.get(TRACK_DATA_LOCATION + 'mostListened')
    }
    static async addListen(id: string): Promise<AxiosResponse<void>>{
        return $api.get(TRACK_DATA_LOCATION + 'addListen', {params: {id}})
    }
}