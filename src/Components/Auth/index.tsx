import React from "react";
import {useState} from "react";
import Login from "../Login";
import Signup from "../Signup";
import Button from "../Common/Button";
import {useTypedSelector} from "../../Hooks/useTypedSelector";
import {useActions} from "../../Hooks/useActions";

const Auth = () => {
    const [login, setLogin] = useState(true)
    const {authorized} = useTypedSelector(s => s.user)
    const {Logout} = useActions()
    return !authorized ? <React.Fragment>
        {login ? <Login/> : <Signup/>}
        <Button style={{marginTop: -23}} onClick={() => setLogin(s => !s)}>{login ? 'Регистрация' : 'Войти'}</Button>
    </React.Fragment>:
    <React.Fragment>
        <span>Вы вошли в аккаунт. Вам доступно больше функций.</span>
        <Button style={{margin: '8px auto 0'}} onClick={Logout}>Выйти</Button>
    </React.Fragment>
}

export default Auth