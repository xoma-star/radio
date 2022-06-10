import {ChangeEvent, useRef, useState} from "react";
import {TRACK_DATA_LOCATION} from "../config";
import {getRandomCover} from "../Images/CoverSamples";
import {useActions} from "./useActions";
import axios from "axios";

const useUploader = () => {
    const [cover, setCover] = useState(getRandomCover())
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [audio, setAudio] = useState<File>()
    const [loadStatus, setLoadStatus] = useState(0) //0 - не отправлял 1 - отправлено 2 - успешно 3 - неудачно

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
                        if(typeof d.tags?.picture?.data !== 'undefined')/*@ts-ignore*/
                            setCover(`data:image/jpeg;base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(d.tags.picture.data)))}`)
                        if(typeof d.tags.title !== 'undefined') setName(d.tags.title as string)
                        else UI_Warn('Не удалось распознать файл. Пожалуйста, введите данные вручную.')
                        if(typeof d.tags.artist !== 'undefined') setAuthor(d.tags.artist as string)
                        else UI_Warn('Не удалось распознать файл. Пожалуйста, введите данные вручную.')
                        setAudio(file)
                    }
                })
            }
        }catch (e) {
            UI_Warn('Неизвестная ошибка')
        }
    }

    const sendToServer = () => {
        setLoadStatus(1)
        const data = new FormData()
        data.append('name', name)
        data.append('author', author)
        data.append('cover64', cover)
        data.append('audio', audio as File)
        axios.post(TRACK_DATA_LOCATION + 'add', data)
            .then(_ => setLoadStatus(2))
            .catch(e => {
                setLoadStatus(3)
                UI_Warn(e.response?.data?.message)
            })
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