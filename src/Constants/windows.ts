import {UI_Windows} from "../Redux/Reducers/ui";
import {icon_dir, icon_cd, icon_channel} from '../Images/Icons'

const windows = {
    [UI_Windows.MUSIC_PLAYER]: {
        icon: icon_cd,
        name: 'Слушать',
        showOnDesktop: true
    },
    [UI_Windows.MUSIC_FOLDER]: {
        icon: icon_dir,
        name: 'Библиотека',
        showOnDesktop: true
    },
    [UI_Windows.FILE_UPLOAD]: {
        icon: icon_channel,
        name: 'Загрузить',
        showOnDesktop: true
    }
}

export default windows