import DesktopIcon from "../Desktop/Icon";
import {
    wallpaper_59,
    wallpaper_beach,
    wallpaper_clouds,
    wallpaper_high_tide,
    wallpaper_mgu,
    wallpaper_xp, wallpaper_zalopa
} from "../../Images/Wallpapers";
import HorizontalScroll from "../Common/HorizontalScroll";
import React from "react";
import {useActions} from "../../Hooks/useActions";

const WallpaperSelect = () => {
    const {UI_SetBackground} = useActions()
    return <HorizontalScroll>
        <DesktopIcon onDoubleClick={() => UI_SetBackground(`url(${wallpaper_xp})`)} label={'Безмятежность'} icon={wallpaper_xp} type={'desktop'}/>
        <DesktopIcon onDoubleClick={() => UI_SetBackground(`url(${wallpaper_clouds})`)} label={'Облака'} icon={wallpaper_clouds} type={'desktop'}/>
        <DesktopIcon onDoubleClick={() => UI_SetBackground(`url(${wallpaper_high_tide})`)} label={'Прилив'} icon={wallpaper_high_tide} type={'desktop'}/>
        <DesktopIcon onDoubleClick={() => UI_SetBackground(`url(${wallpaper_beach})`)} label={'Пляж'} icon={wallpaper_beach} type={'desktop'}/>
        <DesktopIcon onDoubleClick={() => UI_SetBackground(`url(${wallpaper_mgu})`)} label={'Это МГУ?'} icon={wallpaper_mgu} type={'desktop'}/>
        <DesktopIcon onDoubleClick={() => UI_SetBackground(`url(${wallpaper_59})`)} label={'Неотвратимость'} icon={wallpaper_59} type={'desktop'}/>
        <DesktopIcon onDoubleClick={() => UI_SetBackground(`url(${wallpaper_zalopa})`)} label={'Неотвратимость'} icon={wallpaper_zalopa} type={'desktop'}/>
    </HorizontalScroll>
}

export default WallpaperSelect