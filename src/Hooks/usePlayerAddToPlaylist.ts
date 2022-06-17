import usePlayer from "./usePlayer";
import React, {useEffect, useState} from "react";
import PlaylistSchema from "../Schemas/playlist.schema";
import UserService from "../http/Services/UserService";
import PlaylistService from "../http/Services/PlaylistService";
import {useTypedSelector} from "./useTypedSelector";
import {useActions} from "./useActions";
import {UI_Windows} from "../Redux/Reducers/ui";

const usePlayerAddToPlaylist = () => {
    const {id} = usePlayer()
    const {overview} = useTypedSelector(s => s.playlist)
    const {authorized} = useTypedSelector(s => s.user)
    const [playlists, setPlaylists] = useState<PlaylistSchema[]>([])
    const [showPlaylists, setShowPlaylists] = useState<boolean>(false)
    const {UI_Warn, PlaylistSetOverview, UI_OpenWindow} = useActions()
    useEffect(() => {
        setShowPlaylists(false)
    }, [id])
    //
    const addToPlaylistButtonClickHandler = (e: React.MouseEvent) => {
        e.stopPropagation()
        if(!authorized){
            UI_OpenWindow(UI_Windows.LOGIN)
            UI_Warn({type: "warning", text: 'Войдите в аккаунт, чтобы продолжить'})
            return
        }
        setShowPlaylists(true)
        UserService.getUserPlaylists()
            .then(r => {
                setPlaylists(r.data)
            })
            .catch(r => {
                UI_Warn({type: 'warning', text: r?.message})
                setShowPlaylists(false)
            })
    }

    const closeButtonClickHandler = () => setShowPlaylists(false)

    const onCellDoubleClick = (playlistId: string) => () => {
        if(typeof id === 'undefined' || typeof playlistId === 'undefined'){
            UI_Warn({type: "warning", text: 'Неизвестная ошибка'})
            return
        }
        PlaylistService.add(id, playlistId)
            .then(r => {
                console.log(overview, playlistId, overview !== 'create' && overview?.id === playlistId)
                if(overview !== 'create' && overview?.id === playlistId) PlaylistSetOverview(r.data)
                UI_Warn({type: 'success', text: `Добавлено в плейлист ${r.data.name}`})
                setShowPlaylists(false)
            })
            .catch(r => UI_Warn({type: 'warning', text: r?.response?.data?.message}))
    }

    return {
        addToPlaylistButtonClickHandler,
        playlists,
        showPlaylists,
        closeButtonClickHandler,
        onCellDoubleClick
    }
}

export default usePlayerAddToPlaylist