import Input from "../Common/Input";
import Form from "../Common/Form";
import {useState} from "react";
import {useActions} from "../../Hooks/useActions";
import {UI_Windows} from "../../Redux/Reducers/ui";
import isEmail from "../../Functions/isEmail";
import Checkbox from "../Common/Checkbox";
const Signup = () => {
    const {UI_CloseWindow, UI_Warn, Signup} = useActions()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [email, setEmail] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [pending, setPending] = useState(false)

    const submit = () => {
        if(name.length < 1 || password.length < 1 || passwordConfirm.length < 1 || email.length < 1) {
            UI_Warn('Все поля обязательны для заполнения')
            return
        }
        if(password !== passwordConfirm) {
            UI_Warn('Пароли не совпадают')
            return
        }
        if(!isEmail(email)) {
            UI_Warn('Неподдерживаемая почта. Попробуйте другую')
            return
        }

        const onSuccess = () => {
            UI_CloseWindow(UI_Windows.LOGIN)
            UI_Warn({type: "success", text: 'Успешная регистрация! Теперь вам доступно больше функций.'})
        }
        const onError = () => {
            setPending(false)
        }
        setPending(true)
        Signup(name, password, email, onSuccess, onError)
    }

    return <Form
        controlsDisabled={pending}
        header={'Регистрация'}
        description={'Заполните форму ниже. Все поля обязательны.'}
        onSubmit={submit}
        onCancel={() => UI_CloseWindow(UI_Windows.LOGIN)}
        showArt>
        <Input disabled={pending} label={'Имя пользователя'} onChange={setName} autocomplete={'username'}/>
        <Input disabled={pending} type={showPassword ? 'text' : 'password'} label={'Пароль'} onChange={setPassword} autocomplete={'new-password'}/>
        <Input disabled={pending} type={showPassword ? 'text' : 'password'} label={'Повторите пароль'} onChange={setPasswordConfirm} autocomplete={'new-password'}/>
        <Checkbox disabled={pending} label={'Показать пароль'} onChange={(s) => setShowPassword(s)} defaultChecked={false}/>
        <Input disabled={pending} label={'Почта'} onChange={setEmail} autocomplete={'email'}/>
    </Form>
}

export default Signup