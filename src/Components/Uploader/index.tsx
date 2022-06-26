import React from "react";
import './FileUpload.css'
import {icon_error, icon_loading, icon_success} from "../../Images/Icons";
import Button from "../Common/Button";
import useUploader from "../../Hooks/useUploader";
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import Unauthorized from "../Unauthorized";
import List from "../Common/List";
import Cell from "../Common/Cell";
import IconSmall from "../Icons/IconSmall";

const FileUpload = () => {
    const {
        inputRef,
        changeHandler,
        sendToServer,
        clickHandler,
        files
    } = useUploader()

    const {authorized} = useTypedSelector(s => s.user)

    return <div className={'upload-form'}>
        {authorized && <React.Fragment>
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
        {!authorized && <Unauthorized/>}
    </div>
}

export default FileUpload