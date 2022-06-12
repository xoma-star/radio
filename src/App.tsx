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

const App = () => {
    const {CheckAuth} = useActions()
    useEffect(() => {
        if(localStorage.getItem('accessToken')) CheckAuth()
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
        <Taskbar/>
    </React.Fragment>
}

export default App;
