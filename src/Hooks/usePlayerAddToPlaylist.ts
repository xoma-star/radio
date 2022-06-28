import usePlayer from "./usePlayer";
import React, {useEffect, useState} from "react";
import PlaylistService from "../http/Services/PlaylistService";
import {useTypedSelector} from "./useTypedSelector";
import {useActions} from "./useActions";

const usePlayerAddToPlaylist = () => {
    const player = usePlayer()
    const {overview} = useTypedSelector(s => s.playlist)
    const {authorized, playlists, id} = useTypedSelector(s => s.user)
    const [showPlaylists, setShowPlaylists] = useState<boolean>(false)
    const {UI_Warn, PlaylistSetOverview, UserGetPlaylists} = useActions()
    useEffect(() => {
        setShowPlaylists(false)
    }, [player.id])
    //
    const addToPlaylistButtonClickHandler = (e: React.MouseEvent) => {
        e.stopPropagation()
        if(!authorized){
            UI_Warn('Войдите в аккаунт, чтобы продолжить')
            return
        }
        if(!playlists.length) UI_Warn('Нет доступных плейлистов. Создайте первый в библиотеке')
        else setShowPlaylists(true)
    }

    useEffect(() => {
        if(authorized) UserGetPlaylists()
    }, [authorized])

    const closeButtonClickHandler = () => setShowPlaylists(false)

    const onCellDoubleClick = (playlistId: string) => () => {
        if(typeof player.id === 'undefined' || typeof playlistId === 'undefined'){
            UI_Warn('Неизвестная ошибка')
            return
        }
        PlaylistService.add(player.id, playlistId)
            .then(r => {
                if(overview !== 'create' && overview?.id === playlistId) PlaylistSetOverview(r.data)
                UI_Warn({type: 'success', text: `Добавлено в плейлист ${r.data.name}`})
                setShowPlaylists(false)
            })
    }

    return {
        addToPlaylistButtonClickHandler,
        playlists: playlists.filter(x => x.owner === id),
        showPlaylists,
        closeButtonClickHandler,
        onCellDoubleClick
    }
}

export default usePlayerAddToPlaylist