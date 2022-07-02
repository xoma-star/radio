import {useTypedSelector} from "../../Hooks/useTypedSelector";
import './Playlist.css'
import CreatePlaylist from "./create";
import PlaylistOverview from "./overview";
import Placeholder from "../Common/Placeholder";
import {icon_dir_empty, icon_warn} from "../../Images/Icons";
import Button from "../Common/Button";
import {useActions} from "../../Hooks/useActions";
import {UI_Windows} from "../../Redux/Reducers/ui";
import {useEffect} from "react";

const Playlist = () => {
    const {overview} = useTypedSelector(s => s.playlist)
    const {UI_OpenWindow} = useActions()
    useEffect(() => {
        if(window.location.pathname.split('/')[1] === UI_Windows.PLAYLIST){
            if(!overview) return
            if(overview === 'create')
                window.history.replaceState({window: UI_Windows.PLAYLIST, overview: 'create'}, '', `/${UI_Windows.PLAYLIST}/create`)
            else window.history
                .replaceState({window: UI_Windows.PLAYLIST, overview: overview.id}, '', `/${UI_Windows.PLAYLIST}/${overview.id}`)
        }
    }, [window.location.pathname, overview])
    return <div className={'playlist-wrap'}>
        {overview === 'create' && <CreatePlaylist/>}
        {overview && overview !== 'create' && <PlaylistOverview overview={overview}/>}
        {overview === null && <Placeholder
            src={icon_dir_empty}
            description={'Откройте новые для себя плейлисты в навигаторе!'}
            actions={<Button onClick={(e) => {
                e.stopPropagation()
                UI_OpenWindow(UI_Windows.NAVIGATOR)
            }}
            >Открыть</Button>}
        />}
        {!overview && overview !== null && <Placeholder
            src={icon_warn}
            header={'Плейлист не найден'}
            description={'Откройте новые для себя плейлисты в навигаторе!'}
            actions={<Button onClick={(e) => {
                e.stopPropagation()
                UI_OpenWindow(UI_Windows.NAVIGATOR)
            }}
            >Открыть</Button>}
            />}
    </div>
}

export default Playlist