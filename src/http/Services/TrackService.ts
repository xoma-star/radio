import $api from "../index";
import {TRACK_DATA_LOCATION} from "../../config";

export default class TrackService{
    static async getTracks(){
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
}