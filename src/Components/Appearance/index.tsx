import React, {useEffect} from "react";
import Group from "../Common/Group";
import Palette from "../Palette";
import WallpaperSelect from "../WallpaperSelect";
import {firebaseLogEvent} from "../../Firebase";

const Appearance = () => {
    useEffect(() => firebaseLogEvent('opened:appearance'), [])
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