import Input from "../Common/Input";
import Checkbox from "../Common/Checkbox";
import Form from "../Common/Form";
import {useState} from "react";
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import Unauthorized from "../Unauthorized";
import PlaylistService from "../../http/Services/PlaylistService";
import {useActions} from "../../Hooks/useActions";

const CreatePlaylist = () => {
    const {authorized} = useTypedSelector(s => s.user)
    const {PlaylistSetOverview, UserGetPlaylists} = useActions()
    const [name, setName] = useState('')
    const [isPublic, setIsPublic] = useState(true)

    const onSubmit = () => {
        PlaylistService.create(name, isPublic)
            .then(r => {
                UserGetPlaylists()
                PlaylistSetOverview(r.data.id)
            })
    }

    return authorized ? <Form header={'Новый плейлист'} onSubmit={onSubmit}>
        <Input onChange={setName} label={'Название'}/>
        <Checkbox label={'Виден для всех'} defaultChecked={isPublic} onChange={setIsPublic}/>
    </Form> : <Unauthorized/>
}

export default CreatePlaylist