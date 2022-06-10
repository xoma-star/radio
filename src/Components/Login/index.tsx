import Input from "../Common/Input";
import Form from "../Common/Form";
import Button from "../Common/Button";

const Login = () => {
    return <Form header={'Регистрация'} description={'Заполните форму ниже. Все поля обязательны.'}>
        <Input label={'Имя пользователя'}/>
        <Input type={'password'} label={'Пароль'}/>
        <Input type={'password'} label={'Повторите пароль'}/>
        <Input label={'Почта'}/>
        <Button>Регистрация</Button>
    </Form>
}

export default Login