import React from "react";
import './FileUpload.css'
import {icon_error, icon_loading, icon_success} from "../../Images/Icons";
import Button from "../Common/Button";
import Input from "../Common/Input";
import useUploader from "../../Hooks/useUploader";
import Form from "../Common/Form";

const FileUpload = () => {
    const {
        name,
        setName,
        author,
        cover,
        setAuthor,
        loadStatus,
        inputRef,
        coverRef,
        changeHandler,
        sendToServer,
        clickHandler
    } = useUploader()

    return <div className={'upload-form'}>
        {<div className={'cover-wrapper'}>
            <div className={'cover selected'} style={{'--cover': `url(${cover})`} as React.CSSProperties}/>
            <Button
                disabled={name.length < 1 || loadStatus === 1 || loadStatus === 2}
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
        </div>}
        {<div className={'track-data-wrapper'}>
            <Form>
                <Input disabled={name.length < 1 || [1,2].indexOf(loadStatus) >= 0} label={'Название'} onChange={setName} className={'bold'} defaultValue={name}/>
                <Input disabled={name.length < 1 || [1,2].indexOf(loadStatus) >= 0} label={'Автор'} onChange={setAuthor} defaultValue={author}/>
            </Form>
            {loadStatus === 1 && <img src={icon_loading} width={32} height={32} alt={'Loading...'}/>}
            {loadStatus === 2 && <img src={icon_success} width={32} height={32} alt={'Success'}/>}
            {loadStatus === 3 && <img src={icon_error} width={32} height={32} alt={'Error'}/>}
            <div className={'track-data-controls'}>
                <Button disabled={loadStatus === 1} onClick={clickHandler}>Выбрать файл</Button>
                <Button onClick={sendToServer} disabled={name.length < 1 || [1,2].indexOf(loadStatus) >= 0}>Загрузить</Button>
            </div>
        </div>}
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