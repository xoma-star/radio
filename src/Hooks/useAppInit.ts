import {useActions} from "./useActions";
import {useEffect} from "react";
import bridge from "@vkontakte/vk-bridge";
import {UI_Windows} from "../Redux/Reducers/ui";

const useAppInit = () => {
    const {CheckAuth, UI_SetConnectionStatus, UI_Warn, UI_SetVKClient, UI_OpenWindow, UI_SetActiveWindow, PlaylistSetOverview} = useActions()
    useEffect(() => {
        if(localStorage.getItem('accessToken')) CheckAuth()
        fetch('https://xoma-star.space')
            .then(() => UI_SetConnectionStatus('online'))
            .catch(() => {
                UI_SetConnectionStatus('offline')
                UI_Warn('Нет соединения с сетью. Некоторые действия недоступны.')
            })
        window.onoffline = () => {
            UI_SetConnectionStatus('offline')
            UI_Warn('Потеряно соединение. Некоторые действия недоступны.')
        }
        window.ononline = () => {
            UI_SetConnectionStatus('online')
            UI_Warn({type: 'success', text: 'Соединение с сетью восстановлено.'})
        }
        window.onpopstate = (e) => {
            console.log(e.state)
            if(e.state?.window) {
                UI_OpenWindow(e.state.window, false)
                if(e.state.window === UI_Windows.PLAYLIST) {
                    if(typeof e.state.overview === "string") {
                        PlaylistSetOverview(e.state.overview)
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
                        PlaylistSetOverview(path[2])
                        break
                }
            }
        }
        console.log('%cНашел баг? Сообщи о нем xoma_star@vk.com', 'color: white; background: #008080; font-size: 1.5em;' )
        bridge.send('VKWebAppInit').then(() => UI_SetVKClient(true))
    }, [])
}

export default useAppInit