import React, {useEffect} from "react";
import Window from "./Components/Window";
import Desktop from "./Components/Desktop";
import {UI_Windows} from "./Redux/Reducers/ui";
import Taskbar from "./Components/Taskbar";
import windows from "./Constants/windows";
import Player from "./Components/Player";
import bridge from "@vkontakte/vk-bridge";
import {useTypedSelector} from "./Hooks/useTypedSelector";
import FileUpload from "./Components/Uploader";
import Directory from "./Components/Directory";
import Login from "./Components/Login";

const App = () => {
    useEffect(() => {
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
        <Window classNameAdd={'login'} id={UI_Windows.LOGIN}><Login/></Window>
        <Taskbar/>
    </React.Fragment>
}

export default App;
