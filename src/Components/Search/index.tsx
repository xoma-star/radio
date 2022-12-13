import React, {useEffect, useState} from 'react';
import Input from "../Common/Input";
import Form from "../Common/Form";
import useDebounce from "../../Hooks/useDebounce";
import TrackService from "../../http/Services/TrackService";
import TrackSchema from "../../Schemas/track.schema";
import {useActions} from "../../Hooks/useActions";
import List from "../Common/List";
import {FILES_LOCATION} from "../../config";
import {icon_dir, icon_dir_empty, icon_loading} from "../../Images/Icons";
import DesktopIcon from "../Desktop/Icon";
import PlaylistSchema from "../../Schemas/playlist.schema";
import {UI_Windows} from "../../Redux/Reducers/ui";
import Placeholder from "../Common/Placeholder";

const Search = () => {
    const {UI_Warn, UI_OpenWindow, PlayerClearQueue, PlayerSetTrack, PlaylistSetOverview} = useActions()

    const [searchTerm, setSearchTerm] = useState('')
    const [tracks, setTracks] = useState<TrackSchema[]>([])
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const [pending, setPending] = useState(false)

    const onIconDoubleClick = (e: TrackSchema | PlaylistSchema) => {
        if('cover' in e){
            UI_OpenWindow(UI_Windows.MUSIC_PLAYER)
            PlayerClearQueue()
            PlayerSetTrack(e)
        }
        else{
            UI_OpenWindow(UI_Windows.PLAYLIST)
            PlaylistSetOverview(e)
        }
    }

    const onDragStart = (id: string, type: string) => (e: React.DragEvent) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({id, type}))
    }

    useEffect(() => {
        setTracks([])
        if(debouncedSearchTerm.length > 0){
            setPending(true)
            TrackService.search(debouncedSearchTerm)
                .then(r => {
                    setPending(false)
                    setTracks(r.data)
                })
                .catch(r => UI_Warn(r.data))
        }
    }, [debouncedSearchTerm])

    return (
        <Form
            header={'Поиск'}
            description={'Введите в поле поиска имя автора или название трека'}
            showArt>
            <Input onChange={setSearchTerm} style={{justifyContent: 'space-around'}}/>
            <List style={{maxHeight: 400, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxWidth: 400, justifyContent: 'space-between'}}>
                {tracks.map(v => <DesktopIcon
                    key={'search' + v.id}
                    draggable
                    type={'track'}
                    isOnDesktop={false}
                    label={'author' in v ? `${v.author} - ${v.name}` : v.name}
                    onDoubleClick={() => onIconDoubleClick(v)}
                    id={v.id}
                    icon={'cover' in v ? (FILES_LOCATION + v.cover) : icon_dir}
                    onDragStart={onDragStart(v.id, 'cover' in v ? 'track' : 'playlist')}
                />)}
                {pending && <Placeholder src={icon_loading}/>}
                {!pending && debouncedSearchTerm && tracks.length < 1 &&
                    <Placeholder
                        src={icon_dir_empty}
                        header={'Ничего не найдено'}
                        description={'Попробуйте другой запрос или найдите треки в навигаторе'}
                    />}
            </List>
        </Form>
    );
};

export default Search;