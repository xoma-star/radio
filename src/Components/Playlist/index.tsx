import {useTypedSelector} from "../../Hooks/useTypedSelector";
import './Playlist.css'
import CreatePlaylist from "./create";
import PlaylistOverview from "./overview";

const Playlist = () => {
    const {overview} = useTypedSelector(s => s.playlist)
    return <div className={'playlist-wrap'}>
        {overview === 'create' && <CreatePlaylist/>}
        {overview && overview !== 'create' && <PlaylistOverview/>}
    </div>
}

export default Playlist