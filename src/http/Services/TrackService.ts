import $api from "../index";
import {TRACK_DATA_LOCATION} from "../../config";
import TrackSchema from "../../Schemas/track.schema";
import {AxiosResponse} from "axios";

export default class TrackService{
    static async getTracks(): Promise<AxiosResponse<TrackSchema[]>>{
        return $api.get(TRACK_DATA_LOCATION)
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
        const data = {tracks}
        return $api.get(TRACK_DATA_LOCATION + 'getMultiple', {params: {tracks: tracks.join(',')}})
    }
}