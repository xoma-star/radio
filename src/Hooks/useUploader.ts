import {ChangeEvent, useRef, useState} from "react";
import {useActions} from "./useActions";
import TrackService from "../http/Services/TrackService";
import {Buffer} from 'buffer'

const useUploader = () => {
    const [files, setFiles] = useState<{
        name: string,
        author: string,
        cover: string | ArrayBuffer | null | Blob,
        audio: File,
        uploadStatus: number
    }[]>([])
    const {UI_Warn} = useActions()
    const inputRef = useRef<HTMLInputElement>(null)

    const clickHandler = () => inputRef.current?.click()
    const changeHandler = async (event: ChangeEvent) => {
        const input = event.target as HTMLInputElement;
        if (!input.files?.length) return
        setFiles([])
        Array.from(input.files).forEach((file) => {
            try{
                window.jsmediatags.read(file, {
                    onSuccess: (d) => {
                        let a = {cover: '',
                            name: d.tags.title || 'Unknown',
                            author: d.tags.artist || 'Unknow artist',
                            audio: file, uploadStatus: 0}
                        if(typeof d.tags?.picture?.data !== 'undefined'){
                            const u8 = new Uint8Array(d.tags?.picture?.data)
                            a.cover = `data:image/jpeg;base64,${Buffer.from(u8).toString('base64')}`
                        }
                        setFiles(r => [...r, a])
                    }
                })
            }catch (e) {
                UI_Warn('Ошибка при обработке файла')
            }
        })
    }

    const sendToServer = async () => {
        const onSuccess = (i: number) => {
            let a = [...files]
            a[i].uploadStatus = 2
            setFiles(a)
        }
        const onError = (i: number) => {
            let a = [...files]
            a[i].uploadStatus = 3
            setFiles(a)
        }
        const onStart = (i: number) => {
            let a = [...files]
            a[i].uploadStatus = 1
            setFiles(a)
        }
        for(const file of files.filter(x => x.uploadStatus !== 2)) {
            const i = files.findIndex(x => x.name === file.name && x.author === file.author)
            try{
                onStart(i)
                await TrackService.uploadTrack(file.name, file.author, file.cover as string, file.audio as File)
                onSuccess(i)
            }catch (e) {onError(i)}
        }
    }

    return {
        changeHandler,
        sendToServer,
        clickHandler,
        inputRef,
        files
    }
}

export default useUploader