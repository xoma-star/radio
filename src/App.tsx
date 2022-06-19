import React, {useEffect} from "react";
import Window from "./Components/Window";
import Desktop from "./Components/Desktop";
import {UI_Windows} from "./Redux/Reducers/ui";
import windows from "./Constants/windows";
import Player from "./Components/Player";
import {useTypedSelector} from "./Hooks/useTypedSelector";
import FileUpload from "./Components/Uploader";
import Directory from "./Components/Directory";
import Taskbar from "./Components/Taskbar";
import WarningWindow from "./Components/Window/Warning";
import {useActions} from "./Hooks/useActions";
import Auth from "./Components/Auth";
import bridge from "@vkontakte/vk-bridge";
import Navigator from "./Components/Navigator";
import Playlist from "./Components/Playlist";

const App = () => {
    const {CheckAuth, UI_SetConnectionStatus, UI_Warn} = useActions()
    useEffect(() => {
        if(localStorage.getItem('accessToken')) CheckAuth()
        const online = navigator.onLine
        if(online) UI_SetConnectionStatus('online')
        else{
            UI_SetConnectionStatus('offline')
            UI_Warn({type: 'warning', text: 'Нет соединения с сетью. Некоторые действия недоступны.'})
        }
        window.onoffline = () => {
            UI_SetConnectionStatus('offline')
            UI_Warn({type: 'warning', text: 'Потеряно соединение. Некоторые действия недоступны.'})
        }
        window.ononline = () => {
            UI_SetConnectionStatus('online')
            UI_Warn({type: 'success', text: 'Соединение с сетью восстановлено.'})
        }
        bridge.send('VKWebAppInit')
    }, [])
    const {opened} = useTypedSelector(s => s.ui)
    const {name, author} = useTypedSelector(s => s.player)
    return <React.Fragment>
        <Desktop/>
        {opened.indexOf(UI_Windows.MUSIC_FOLDER) >= 0 &&<Window
            id={UI_Windows.MUSIC_FOLDER}
        ><Directory/></Window>}
        {opened.indexOf(UI_Windows.MUSIC_PLAYER) >= 0 &&<Window
            id={UI_Windows.MUSIC_PLAYER}
            header={
                name && author ?
                `${author} - ${name}` :
                windows[UI_Windows.MUSIC_PLAYER].name
            }
            classNameAdd={'player'}
        ><Player/></Window>}
        {opened.indexOf(UI_Windows.FILE_UPLOAD) >= 0 && <Window
            id={UI_Windows.FILE_UPLOAD}
        ><FileUpload/></Window>}
        {opened.indexOf(UI_Windows.LOGIN) >= 0 && <Window classNameAdd={'login'} id={UI_Windows.LOGIN}>
            <Auth/>
        </Window>}
        {opened.indexOf(UI_Windows.WARNING) >= 0 && <Window id={UI_Windows.WARNING} hideIcon>
            <WarningWindow/>
        </Window>}
        {opened.indexOf(UI_Windows.NAVIGATOR) >= 0 && <Window id={UI_Windows.NAVIGATOR}>
            <Navigator/>
        </Window>}
        {opened.indexOf(UI_Windows.PLAYLIST) >= 0 && <Window id={UI_Windows.PLAYLIST}>
            <Playlist/>
        </Window>}
        <Taskbar/>
    </React.Fragment>
}

export default App;
