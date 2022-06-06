import React, {ChangeEvent, useRef, useState} from "react";
import rover from '../../Images/rover-windows-xp.gif'
import './FileUpload.css'
import {icon_error, icon_loading, icon_success} from "../../Images/Icons";
import {useActions} from "../../Hooks/useActions";
import {UI_Windows} from "../../Redux/Reducers/ui";
import {TRACK_DATA_LOCATION} from "../../config";
import Button from "../Common/Button";

const FileUpload = () => {
    const [cover, setCover] = useState(rover)
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [audio, setAudio] = useState<File>()
    const [loadStatus, setLoadStatus] = useState(0) //0 - не отправлял 1 - отправлено 2 - успешно 3 - неудачно
    const {PlayerSetTrack, UI_OpenWindow, UI_SetActiveWindow} = useActions()

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
                            setCover(`data:image/png;base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(d.tags.picture.data)))}`)
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
            body: data,
            headers: {
                // 'Content-Type': 'application/json'
            }
        }).then(async r => {
            const data = await r.json()
            setLoadStatus(2)
            UI_OpenWindow(UI_Windows.MUSIC_PLAYER)
            UI_SetActiveWindow(UI_Windows.MUSIC_PLAYER)
            PlayerSetTrack(data.id)
        }).catch(() => {
            setLoadStatus(3)
        })
    }

    return <div className={'upload-form'}>
        <div className={'cover-wrapper'}>
            <div className={'cover selected'} style={{'--cover': `url(${cover})`} as React.CSSProperties}/>
            <Button
                disabled={name.length < 1 || loadStatus === 1}
                onClick={() => coverRef.current?.click()}
            >Изменить</Button>
            <input
                onChange={(e) => changeHandler(e, true)}
                ref={coverRef}
                type={'file'}
                style={{display: 'none'}}
                multiple={false}
                accept={'image/*'}
            />
        </div>
        <div className={'track-data-wrapper'}>
            <div className={'track-data'}>
                <input onChange={e => setName(e.currentTarget.value)} className={'selected bold'} value={name}/>
                <input onChange={e => setAuthor(e.currentTarget.value)} className={'selected'} value={author}/>
            </div>
            {loadStatus === 1 && <img src={icon_loading} width={32} height={32} alt={'Loading...'}/>}
            {loadStatus === 2 && <img src={icon_success} width={32} height={32} alt={'Success'}/>}
            {loadStatus === 3 && <img src={icon_error} width={32} height={32} alt={'Error'}/>}
            <Button onClick={sendToServer} disabled={name.length < 1 || [1,2].indexOf(loadStatus) >= 0}>Загрузить</Button>
        </div>
        <Button disabled={loadStatus === 1} onClick={clickHandler}>Выбрать файл</Button>
        <input
            ref={inputRef}
            type={'file'}
            style={{display: 'none'}}
            multiple={false}
            accept={'audio/*'}
            onChange={changeHandler}
        />
    </div>
}

export default FileUpload