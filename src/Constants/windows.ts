import {UI_Windows} from "../Redux/Reducers/ui";
import {
    icon_dir,
    icon_cd,
    icon_channel,
    icon_credentials,
    icon_warn,
    icon_globe_click,
    icon_dir_open, icon_files
} from '../Images/Icons'

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
    },
    [UI_Windows.LOGIN]: {
        icon: icon_credentials,
        name: 'Аккаунт',
        showOnDesktop: true
    },
    [UI_Windows.WARNING]: {
        icon: icon_warn,
        name: 'Информация',
        showOnDesktop: false
    },
    [UI_Windows.NAVIGATOR]: {
        icon: icon_globe_click,
        name: 'Навигатор',
        showOnDesktop: true
    },
    [UI_Windows.PLAYLIST]: {
        icon: icon_dir_open,
        name: 'Плейлист',
        showOnDesktop: false
    },
    [UI_Windows.QUEUE]: {
        icon: icon_files,
        name: 'Очередь',
        showOnDesktop: false
    }
}

export default windows