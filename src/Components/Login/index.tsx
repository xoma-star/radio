import Form from "../Common/Form";
import {UI_Windows} from "../../Redux/Reducers/ui";
import Input from "../Common/Input";
import {useActions} from "../../Hooks/useActions";
import {useState} from "react";
import {firebaseLogEvent} from '../../Firebase'
import Button from "../Common/Button";
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import React from "react";

const Login = ()  => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [pending, setPending] = useState(false)
    const {UI_CloseWindow, UI_Warn, Login, LoginVK} = useActions()
    const {isVKClient} = useTypedSelector(state => state.ui)

    const onSuccess = () => {
        UI_CloseWindow(UI_Windows.LOGIN)
        firebaseLogEvent('login')
        UI_Warn({type: "success", text: 'С возвращением!'})
    }
    const onError = () => {
        setPending(false)
    }

    const submit = async () => {
        if(isVKClient) {
            UI_Warn('Используйте кнопку выше')
            return
        }
        if(name.length < 1 || password.length < 1) {
            UI_Warn('Все поля обязательны для заполнения')
            return
        }
        setPending(true)
        Login(name, password, onSuccess, onError)
    }

    const VK = async () => {
        LoginVK((pass) => {
            if(pass){
                UI_Warn({type: "success", text: 'Вы первый раз заходите через ВК, так что '+
                        'вы автоматически зарегистрировались на основном сайте. Вы все так же можете пользоваться '+
                        'приложением внутри ВК, но если вам нужно будет использовать учетную запись на сайте, используйте в качестве логина почту, '+
                        'а в качестве пароля - '+pass})
            }else UI_Warn('С возвращением!')
            UI_CloseWindow(UI_Windows.LOGIN)
        }, onError)
    }

    return <Form
        controlsDisabled={pending}
        onSubmit={submit}
        onCancel={() => UI_CloseWindow(UI_Windows.LOGIN)}>
        {!isVKClient && <React.Fragment>
            <Input disabled={pending} label={'Имя пользователя'} onChange={setName} autocomplete={'username'}/>
            <Input disabled={pending} type={'password'} label={'Пароль'} onChange={setPassword} autocomplete={'current-password'}/>
        </React.Fragment>}
        {isVKClient && <Button onClick={VK} disabled={pending} style={{width: '100%'}}>Авторизация через ВК</Button>}
    </Form>
}

export default Login