import React from "react"
import {UI_Windows} from "../../Redux/Reducers/ui";
import Window from "../Window";
import Directory from "../Directory";
import windows from "../../Constants/windows";
import Player from "../Player";
import FileUpload from "../Uploader";
import Auth from "../Auth";
import WarningWindow from "../Window/Warning";
import Navigator from "../Navigator";
import Playlist from "../Playlist";
import TracksQueue from "../Queue";
import Appearance from "../Appearance";
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import Help from "../Help";

const Windows = () => {
    const {opened} = useTypedSelector(s => s.ui)
    const {name, author} = useTypedSelector(s => s.player)

    return <React.Fragment>
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
        {opened.indexOf(UI_Windows.QUEUE) >= 0 && <Window id={UI_Windows.QUEUE}>
            <TracksQueue/>
        </Window>}
        {opened.indexOf(UI_Windows.APPEARANCE) >= 0 && <Window id={UI_Windows.APPEARANCE}>
            <Appearance/>
        </Window>}
        {opened.indexOf(UI_Windows.HELP) >= 0 && <Window id={UI_Windows.HELP}>
            <Help/>
        </Window>}
    </React.Fragment>
}

export default Windows