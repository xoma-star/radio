import $api from "../index";
import {USER_DATA_LOCATION} from "../../config";

export default class UserService{
    static async getUserPlaylists(){
        return $api.get(USER_DATA_LOCATION + 'playlists')
    }
}