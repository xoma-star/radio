import './Taskbar.css'
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import {useActions} from "../../Hooks/useActions";
import {UI_Windows} from "../../Redux/Reducers/ui";
import windows from "../../Constants/windows";
import Button from "../Common/Button";
import {useEffect, useState} from "react";
import IconSmall from "../Icons/IconSmall";
import {icon_offline, icon_online} from "../../Images/Icons";


const Taskbar = () => {
    const [time, setTime] = useState<string>()
    const {opened, minimized, activeWindow, connectionStatus} = useTypedSelector(s => s.ui)
    const {name} = useTypedSelector(s => s.player)
    const {overview} = useTypedSelector(s => s.playlist)
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

    const getTime = () => {
        const date = new Date()
        let h = date.getHours().toString()
        let m = date.getMinutes().toString()
        if(h.length < 2) h = `0${h}`
        if(m.length < 2) m = `0${m}`
        return `${h}:${m}`
    }

    useEffect(() => {
        const id = setInterval(() => setTime(getTime()), 3000)
        return () => clearInterval(id)
    }, [])

    return <div className={'taskbar'}>
        <Button className="start-button toggle">
            <img alt={'start'} src="https://98.js.org/images/start.png"/><b>Пуск</b>
        </Button>
        <div className={'taskbar-divider'}/>
        <div className="tasks">
            {opened.map(v => <Button onClick={() => handler(v)} key={v} className={`task${activeWindow === v ? ' selected' : ''}`}>
                <img src={windows[v].icon} width="16" height="16" alt={windows[v].name}/>
                {window.screen.width > 400 && <span className="title">
                    {v === UI_Windows.PLAYLIST && overview !== 'create' && overview && (overview.name || windows[v].name)}
                    {v === UI_Windows.MUSIC_PLAYER && (name || windows[v].name)}
                    {
                        v !== UI_Windows.PLAYLIST &&
                        v !== UI_Windows.MUSIC_PLAYER &&
                        windows[v].name
                    }
                </span>}
            </Button>)}
        </div>
        <div className={'taskbar-divider'}/>
        <div className={'tray inset-shallow'}>
            <div className={'taskbar-icons'}>
                <IconSmall src={connectionStatus === 'online' ? icon_online : icon_offline}/>
            </div>
            <div className="taskbar-time">{time}</div>
        </div>
    </div>
}

export default Taskbar