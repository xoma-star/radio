import {ChangeEvent, useEffect, useRef, useState} from "react";
import {getRandomCover} from "../Images/CoverSamples";
import {useActions} from "./useActions";
import toDataUrl from "../Functions/toDataUrl";
import TrackService from "../http/Services/TrackService";
import {Buffer} from 'buffer'

const useUploader = () => {
    const [cover, setCover] = useState<string | ArrayBuffer | null | Blob>()
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [audio, setAudio] = useState<File>()
    const [loadStatus, setLoadStatus] = useState(0) //0 - не отправлял 1 - отправлено 2 - успешно 3 - неудачно

    useEffect(() => toDataUrl(getRandomCover(), (e) => setCover(e)), [])

    const {UI_Warn} = useActions()

    const inputRef = useRef<HTMLInputElement>(null)
    const coverRef = useRef<HTMLInputElement>(null)
    const clickHandler = () => inputRef.current?.click()
    const changeHandler = async (event: ChangeEvent, isImage?: boolean) => {
        const input = event.target as HTMLInputElement;
        if (!input.files?.length) return
        const file = input.files[0];
        try {
            if(isImage){
                let reader = new FileReader();
                reader.onloadend = () => setCover(reader.result)
                reader.readAsDataURL(file)
            }
            else{
                setLoadStatus(0)
                window.jsmediatags.read(file, {
                    onSuccess: (d) => {
                        if(typeof d.tags?.picture?.data !== 'undefined'){
                            const u8 = new Uint8Array(d.tags?.picture?.data)
                            setCover(`data:image/jpeg;base64,${Buffer.from(u8).toString('base64')}`)
                        }
                        else toDataUrl(getRandomCover(), (e) => setCover(e))
                        if(typeof d.tags.title !== 'undefined') setName(d.tags.title as string)
                        else UI_Warn({type: 'warning', text: 'Не удалось распознать файл. Пожалуйста, введите данные вручную.'})
                        if(typeof d.tags.artist !== 'undefined') setAuthor(d.tags.artist as string)
                        else UI_Warn({type: 'warning', text: 'Не удалось распознать файл. Пожалуйста, введите данные вручную.'})
                        setAudio(file)
                    }
                })
            }
        }catch (e) {
            UI_Warn({type: "warning", text: 'Неизвестная ошибка'})
        }
    }

    const sendToServer = () => {
        setLoadStatus(1)
        const onSuccess = () => setLoadStatus(2)
        const onError = (e: string) => {
            setLoadStatus(3)
            UI_Warn({type: "warning", text: e})
        }
        TrackService.uploadTrack(name, author, cover as string, audio as File)
            .then(_ => onSuccess())
            .catch(r => onError(r?.response?.data?.message))
    }

    return {
        cover,
        name,
        author,
        loadStatus,
        setName,
        setAuthor,
        changeHandler,
        coverRef,
        sendToServer,
        clickHandler,
        inputRef,
        audio
    }
}

export default useUploader