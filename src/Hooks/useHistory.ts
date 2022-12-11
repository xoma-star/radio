import {UI_Windows} from "../Redux/Reducers/ui";
import {useActions} from "./useActions";
import {useEffect} from "react";

const useHistory = () => {
    const {UI_OpenWindow, PlaylistSetOverview, UI_SetActiveWindow, PlayerSetTrack} = useActions()
    useEffect(() => {
        window.onpopstate = (e) => {
            if(e.state?.window) {
                UI_OpenWindow(e.state.window, false)
                if(e.state.window === UI_Windows.PLAYLIST) {
                    if(typeof e.state?.overview === "string") {
                        PlaylistSetOverview(e.state.overview)
                    }
                }
                if(e.state.window === UI_Windows.MUSIC_PLAYER) {
                    if(typeof e.state?.track === "string") {
                        // PlayerSetTrack(e.state.track)
                    }
                }
            }
            else UI_SetActiveWindow(null, false)
        }
        if(window.location.pathname !== '/'){
            const path = window.location.pathname.split('/')
            if((Object as any).values(UI_Windows).includes(path[1])){
                UI_OpenWindow(path[1] as UI_Windows, false)
                switch (path[1]){
                    case UI_Windows.PLAYLIST:
                        if(path[2]) PlaylistSetOverview(path[2])
                        break
                    case UI_Windows.MUSIC_PLAYER:
                        if(path[2]) PlayerSetTrack(path[2])
                }
            }
        }
    }, [])
}

export default useHistory