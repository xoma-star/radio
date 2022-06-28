import Form from "../Common/Form";
import {UI_Windows} from "../../Redux/Reducers/ui";
import Input from "../Common/Input";
import {useActions} from "../../Hooks/useActions";
import {useState} from "react";
import {firebaseLogEvent} from '../../Firebase'
import Button from "../Common/Button";
import bridge from "@vkontakte/vk-bridge";

const Login = ()  => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [pending, setPending] = useState(false)
    const {UI_CloseWindow, UI_Warn, Login} = useActions()

    const onSuccess = () => {
        UI_CloseWindow(UI_Windows.LOGIN)
        firebaseLogEvent('login')
        UI_Warn({type: "success", text: 'С возвращением!'})
    }
    const onError = () => {
        setPending(false)
    }

    const submit = async () => {
        if(name.length < 1 || password.length < 1) {
            UI_Warn('Все поля обязательны для заполнения')
            return
        }
        setPending(true)
        Login(name, password, onSuccess, onError)
    }

    const VK = async () => {
        console.log(bridge.send('VKWebAppGetEmail'))
    }

    return <Form
        controlsDisabled={pending}
        onSubmit={submit}
        onCancel={() => UI_CloseWindow(UI_Windows.LOGIN)}>
        <Input disabled={pending} label={'Имя пользователя'} onChange={setName} autocomplete={'username'}/>
        <Input disabled={pending} type={'password'} label={'Пароль'} onChange={setPassword} autocomplete={'current-password'}/>
        <Button onClick={VK} disabled={pending} style={{width: '100%'}}>Авторизация через ВК</Button>
    </Form>
}

export default Login