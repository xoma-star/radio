import React from "react";
import {useState} from "react";
import Login from "../Login";
import Signup from "../Signup";
import Button from "../Common/Button";
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import {useActions} from "../../Hooks/useActions";
import {icon_success} from "../../Images/Icons";
import Placeholder from "../Common/Placeholder";

const Auth = () => {
    const [login, setLogin] = useState(true)
    const {authorized} = useTypedSelector(s => s.user)
    const {isVKClient} = useTypedSelector(s => s.ui)
    const {Logout} = useActions()
    return !authorized ? <React.Fragment>
        {login ? <Login/> : <Signup/>}
        {!isVKClient && <Button style={{marginTop: -23}} onClick={() => setLogin(s => !s)}>{login ? 'Регистрация' : 'Войти'}</Button>}
    </React.Fragment>:
        <Placeholder
            src={icon_success}
            description={'Вы вошли в аккаунт. Теперь вам доступно больше функций.'}
            actions={<Button onClick={Logout}>Выйти</Button>}
        />
}

export default Auth