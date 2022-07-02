import {useActions} from "./useActions";
import {useEffect} from "react";
import bridge from "@vkontakte/vk-bridge";

const useAppInit = () => {
    const {CheckAuth, UI_SetConnectionStatus, UI_Warn, UI_SetVKClient} = useActions()
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

        console.log('%cНашел баг? Сообщи о нем xoma_star@vk.com', 'color: white; background: #008080; font-size: 1.5em;' )
        bridge.send('VKWebAppInit').then(() => UI_SetVKClient(true))
    }, [])
}

export default useAppInit