import DesktopIcon from "../Desktop/Icon";
import wallpapers from "../../Images/Wallpapers";
import HorizontalScroll from "../Common/HorizontalScroll";
import React from "react";
import {useActions} from "../../Hooks/useActions";

const WallpaperSelect = () => {
    const {UI_SetBackground} = useActions()
    return <HorizontalScroll maxWidth={500}>
        {Object.keys(wallpapers).map((v, i) =>
            //@ts-ignore
            <DesktopIcon onDoubleClick={() => UI_SetBackground(`url(${wallpapers[v]})`)} icon={wallpapers[v]} label={i+1} type={'desktop'}/>
        )}
    </HorizontalScroll>
}

export default WallpaperSelect