import Button from "../Common/Button";
import './Palette.css'
import {useActions} from "../../Hooks/useActions";

const Palette = () => {
    const {UI_SetBackground} = useActions()
    const a = [
        '#008080',
        '#000000',
        '#ffffff',
        '#808000',
        '#800080',
        '#3b6ea5'
    ]
    return <div className={'palette'}>
        {a.map(r => <Button key={`color${r}`} onClick={() => UI_SetBackground(r)} className={'color'} style={{backgroundColor: r}}/>)}
    </div>
}

export default Palette