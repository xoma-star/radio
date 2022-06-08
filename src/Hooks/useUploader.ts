import {ChangeEvent, useRef, useState} from "react";
import {TRACK_DATA_LOCATION} from "../config";
import {getRandomCover} from "../Images/CoverSamples";

const useUploader = () => {
    const [cover, setCover] = useState(getRandomCover())
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [audio, setAudio] = useState<File>()
    const [loadStatus, setLoadStatus] = useState(0) //0 - не отправлял 1 - отправлено 2 - успешно 3 - неудачно

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
                        setName(d.tags.title as string)
                        setAuthor(d.tags.artist as string)
                        setAudio(file)
                    }
                })
            }
        }catch (e) {
            console.log(e)
        }
    }

    const sendToServer = () => {
        setLoadStatus(1)
        const data = new FormData()
        data.append('name', name)
        data.append('author', author)
        data.append('cover64', cover)
        data.append('audio', audio as File)
        fetch(TRACK_DATA_LOCATION + 'add', {
            method: 'POST',
            body: data
        }).then(async r => {
            const data = await r.json()
            setLoadStatus(2)
        }).catch(() => {
            setLoadStatus(3)
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
        inputRef
    }
}

export default useUploader