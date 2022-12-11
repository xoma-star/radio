import React from "react";
import Group from "../Common/Group";
import Palette from "../Palette";
import WallpaperSelect from "../WallpaperSelect";
import Checkbox from "../Common/Checkbox";
import {useActions} from "../../Hooks/useActions";
import {useTypedSelector} from "../../Hooks/useTypedSelector";

const Appearance = () => {
    const {UI_SetSnowing} = useActions()
    const {isSnowing} = useTypedSelector(s => s.ui)
    return <React.Fragment>
        <Group header={'Сплошной цвет'}>
            <Palette/>
        </Group>
        <Group header={'Обои'}>
            <WallpaperSelect/>
        </Group>
        <Group header={'Разное'}>
            <Checkbox label={'Показывать снег'} defaultChecked={isSnowing} onChange={UI_SetSnowing}/>
        </Group>
    </React.Fragment>
}

export default Appearance