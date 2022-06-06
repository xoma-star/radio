import './Taskbar.css'
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import {useActions} from "../../Hooks/useActions";
import {UI_Windows} from "../../Redux/Reducers/ui";
import windows from "../../Constants/windows";
import Button from "../Common/Button";

const Taskbar = () => {
    const {opened, minimized, activeWindow} = useTypedSelector(s => s.ui)
    const {UI_SetActiveWindow, UI_MinimizeWindow} = useActions()
    const handler = (v: UI_Windows) => {
        if(v === activeWindow) {
            UI_SetActiveWindow(null)
            UI_MinimizeWindow(v)
        }
        if(minimized[v]){
            UI_SetActiveWindow(v)
            UI_MinimizeWindow(v)
        }
        if(v !== activeWindow) UI_SetActiveWindow(v)
    }
    return <div className={'taskbar'}>
        <Button className="start-button toggle">
            <img alt={'start'} src="https://98.js.org/images/start.png"/><b>Пуск</b>
        </Button>
        <div className={'taskbar-divider'}/>
        <div className="tasks">
            {opened.map(v => <Button onClick={() => handler(v)} key={v} className={`task${activeWindow === v ? ' selected' : ''}`}>
                <img src={windows[v].icon} width="16" height="16" alt={windows[v].name}/>
                {window.screen.width > 400 && <span className="title">{windows[v].name}</span>}
            </Button>)}
        </div>
        <div className={'taskbar-divider'}/>
        <div className="tray inset-shallow">
            <div className="taskbar-time">21:49</div>
        </div>
    </div>
}

export default Taskbar