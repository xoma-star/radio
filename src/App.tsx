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
import {useActions} from "./Hooks/useActions";
import Directory from "./Components/Directory";

const App = () => {
    useEffect(() => {
        bridge.subscribe((e) => {
            console.log(e)
        })
        bridge.send('VKWebAppInit')
    }, [])
    const {opened} = useTypedSelector(s => s.ui)
    const {name, author} = useTypedSelector(s => s.player)
    return <React.Fragment>
        <Desktop/>
        {opened.indexOf(UI_Windows.MUSIC_FOLDER) >= 0 &&<Window
            id={UI_Windows.MUSIC_FOLDER}
            header={windows[UI_Windows.MUSIC_FOLDER].name}
            icon={windows[UI_Windows.MUSIC_FOLDER].icon}
        ><Directory/></Window>}
        {opened.indexOf(UI_Windows.MUSIC_PLAYER) >= 0 &&<Window
            id={UI_Windows.MUSIC_PLAYER}
            header={
                name && author ?
                `${author} - ${name}` :
                windows[UI_Windows.MUSIC_PLAYER].name
            }
            icon={windows[UI_Windows.MUSIC_PLAYER].icon}
            classNameAdd={'player'}
        ><Player/></Window>}
        {opened.indexOf(UI_Windows.FILE_UPLOAD) >= 0 && <Window
            header={windows[UI_Windows.FILE_UPLOAD].name}
            id={UI_Windows.FILE_UPLOAD}
            icon={windows[UI_Windows.FILE_UPLOAD].icon}
        ><FileUpload/></Window>}
        <Taskbar/>
    </React.Fragment>
}

export default App;
