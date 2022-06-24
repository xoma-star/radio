import usePlayer from "./usePlayer";
import React, {useEffect, useState} from "react";
import PlaylistService from "../http/Services/PlaylistService";
import {useTypedSelector} from "./useTypedSelector";
import {useActions} from "./useActions";
import {UI_Windows} from "../Redux/Reducers/ui";

const usePlayerAddToPlaylist = () => {
    const {id} = usePlayer()
    const {overview} = useTypedSelector(s => s.playlist)
    const {authorized, playlists} = useTypedSelector(s => s.user)
    const [showPlaylists, setShowPlaylists] = useState<boolean>(false)
    const {UI_Warn, PlaylistSetOverview, UI_OpenWindow, UserGetPlaylists} = useActions()
    useEffect(() => {
        setShowPlaylists(false)
    }, [id])
    //
    const addToPlaylistButtonClickHandler = (e: React.MouseEvent) => {
        e.stopPropagation()
        if(!authorized){
            UI_OpenWindow(UI_Windows.LOGIN)
            UI_Warn('Войдите в аккаунт, чтобы продолжить')
            return
        }
        setShowPlaylists(true)
        if(playlists.length < 1) UserGetPlaylists()
    }

    const closeButtonClickHandler = () => setShowPlaylists(false)

    const onCellDoubleClick = (playlistId: string) => () => {
        if(typeof id === 'undefined' || typeof playlistId === 'undefined'){
            UI_Warn('Неизвестная ошибка')
            return
        }
        PlaylistService.add(id, playlistId)
            .then(r => {
                if(overview !== 'create' && overview?.id === playlistId) PlaylistSetOverview(r.data)
                UI_Warn({type: 'success', text: `Добавлено в плейлист ${r.data.name}`})
                setShowPlaylists(false)
            })
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