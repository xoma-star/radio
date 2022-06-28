import React from "react";
import './FileUpload.css'
import {icon_error, icon_loading, icon_success, icon_warn} from "../../Images/Icons";
import Button from "../Common/Button";
import useUploader from "../../Hooks/useUploader";
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import List from "../Common/List";
import Cell from "../Common/Cell";
import IconSmall from "../Icons/IconSmall";
import {useActions} from "../../Hooks/useActions";
import {UI_CloseWindow} from "../../Redux/ActionCreators/ui";
import {UI_Windows} from "../../Redux/Reducers/ui";

const FileUpload = () => {
    const {
        inputRef,
        changeHandler,
        sendToServer,
        clickHandler,
        files
    } = useUploader()

    const {id} = useTypedSelector(s => s.user)
    const { UI_CloseWindow } = useActions()

    return <div className={'upload-form'}>
        {id === '259a6a14-ba44-4aeb-8d86-d8aa4a0c4861' && <React.Fragment>
            <List style={{maxHeight: '50vh'}}>
                {files.map(file =>
                    <Cell key={file.name + file.author}
                          before={<IconSmall src={file.cover as string}/>}
                          after={
                                (file.uploadStatus === 1 && <IconSmall src={icon_loading}/>) ||
                                (file.uploadStatus === 2 && <IconSmall src={icon_success}/>) ||
                                (file.uploadStatus === 3 && <IconSmall src={icon_error}/>)
                          }
                    >
                        {`${file.author} - ${file.name}`}
                    </Cell>)}
            </List>
            <div className={'track-data-controls'}>
                <Button disabled={files.filter(x => x.uploadStatus === 1).length > 0} onClick={clickHandler}>Выбрать файл</Button>
                <Button onClick={sendToServer} disabled={files.length < 1 || files.filter(x => x.uploadStatus === 1).length > 0}>Загрузить</Button>
            </div>
            <input
                ref={inputRef}
                type={'file'}
                style={{display: 'none'}}
                multiple={true}
                accept={'audio/x-m4a'}
                onChange={changeHandler}
            />
        </React.Fragment>}
        {id !== '259a6a14-ba44-4aeb-8d86-d8aa4a0c4861' && <React.Fragment>
            <div className={'warning-window'}>
                <img src={icon_warn} alt={'Ошb,rf'}/>
                <span>Доступно только экспертам</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <Button disabled style={{margin: '8px 0'}}>Стать экспертом</Button>
                <Button style={{margin: '8px 0'}} onClick={() => UI_CloseWindow(UI_Windows.FILE_UPLOAD)}>OK</Button>
            </div>
        </React.Fragment>}
    </div>
}

export default FileUpload