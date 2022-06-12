import Form from "../Common/Form";
import {UI_Windows} from "../../Redux/Reducers/ui";
import Input from "../Common/Input";
import {useActions} from "../../Hooks/useActions";
import {useState} from "react";


const Login = ()  => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [pending, setPending] = useState(false)
    const {UI_CloseWindow, UI_Warn, Login} = useActions()

    const onSuccess = () => {
        UI_CloseWindow(UI_Windows.LOGIN)
        UI_Warn({type: "success", text: 'С возвращением!'})
    }
    const onError = (e: string) => {
        setPending(false)
        UI_Warn({type: "warning", text: e})
    }

    const submit = async () => {
        if(name.length < 1 || password.length < 1) {
            UI_Warn({type: "warning", text: 'Все поля обязательны для заполнения'})
            return
        }
        setPending(true)
        Login(name, password, onSuccess, onError)

    }

    return <Form
        controlsDisabled={pending}
        onSubmit={submit}
        onCancel={() => UI_CloseWindow(UI_Windows.LOGIN)}>
        <Input disabled={pending} label={'Имя пользователя'} onChange={setName} autocomplete={'username'}/>
        <Input disabled={pending} type={'password'} label={'Пароль'} onChange={setPassword} autocomplete={'current-password'}/>
        {/*<Checkbox disabled={pending} label={'Запомнить'} defaultChecked={true} onChange={setRemember}/>*/}
    </Form>
}

export default Login