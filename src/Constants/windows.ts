import {UI_Windows} from "../Redux/Reducers/ui";
import {
    icon_dir,
    icon_cd,
    icon_channel,
    icon_credentials,
    icon_warn,
    icon_globe_click,
    icon_dir_open, icon_files, icon_color, icon_help, icon_logo
} from '../Images/Icons'

const windows = {
    [UI_Windows.MUSIC_PLAYER]: {
        icon: icon_cd,
        name: 'Проигрыватель',
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
    },
    [UI_Windows.APPEARANCE]: {
        icon: icon_color,
        name: 'Внешний вид',
        showOnDesktop: true
    },
    [UI_Windows.HELP]: {
        icon: icon_help,
        name: 'Помощь',
        showOnDesktop: true
    },
    [UI_Windows.ABOUT]: {
        icon: icon_logo,
        name: 'О приложении',
        showOnDesktop: false
    }
}

export default windows