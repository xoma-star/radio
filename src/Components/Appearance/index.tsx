import React from "react";
import Group from "../Common/Group";
import Palette from "../Palette";
import WallpaperSelect from "../WallpaperSelect";

const Appearance = () => {
    return <React.Fragment>
        <Group header={'Сплошной цвет'}>
            <Palette/>
        </Group>
        <Group header={'Обои'}>
            <WallpaperSelect/>
        </Group>
    </React.Fragment>
}

export default Appearance