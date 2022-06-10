import Input from "../Common/Input";
import Form from "../Common/Form";
import {useState} from "react";
import {useActions} from "../../Hooks/useActions";
import {UI_Windows} from "../../Redux/Reducers/ui";
import isEmail from "../../Functions/isEmail";
import Checkbox from "../Common/Checkbox";
import {USER_DATA_LOCATION} from "../../config";
import axios from "axios";

const Login = () => {
    const {UI_CloseWindow, UI_Warn} = useActions()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [email, setEmail] = useState('')
    const [showPassword, setShowPassword] = useState(false)

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
        const data = {name, password, email}
        axios.post(USER_DATA_LOCATION + 'signup', data)
            .then(r => console.log(r))
            .catch(e => UI_Warn(e.response?.data?.message))
    }

    return <Form
        header={'Регистрация'}
        description={'Заполните форму ниже. Все поля обязательны.'}
        onSubmit={submit}
        onCancel={() => UI_CloseWindow(UI_Windows.LOGIN)}
        showArt>
        <Input label={'Имя пользователя'} onChange={setName} autocomplete={'username'}/>
        <Input type={showPassword ? 'text' : 'password'} label={'Пароль'} onChange={setPassword} autocomplete={'new-password'}/>
        <Input type={showPassword ? 'text' : 'password'} label={'Повторите пароль'} onChange={setPasswordConfirm} autocomplete={'new-password'}/>
        <Checkbox label={'Показать пароль'} onChange={() => setShowPassword(s => !s)} checkedProp={false}/>
        <Input label={'Почта'} onChange={setEmail} autocomplete={'email'}/>
    </Form>
}

export default Login