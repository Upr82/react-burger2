import React, { FC } from "react";
import styles from './auth.module.css';
import {
  PasswordInput, EmailInput, Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  INPUT_LOGIN_EMAIL, INPUT_LOGIN_PASSWORD
} from "../services/actions/login";
import { postLoginThunk } from "../services/actions/login";



const Login: FC = () => {

  const location = useLocation();

  const getLoginForm = (store: any) => store.login;
  const { email, password } = useSelector(getLoginForm);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { from } = location.state || {};

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(postLoginThunk(navigate, from, email, password));
  }

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: INPUT_LOGIN_EMAIL,
      email: e.target.value
    });
  }

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: INPUT_LOGIN_PASSWORD,
      password: e.target.value
    });
  }

  return (
    <div className={`${styles.container}`}>
      <h2
        className={`${styles.title} text text_type_main-medium`}
      >Вход</h2>
      <form className={`${styles.form}`} onSubmit={onFormSubmit}>
        <EmailInput
          name="email"
          onChange={changeEmail}
          value={email}
          isIcon={false}
          disabled={false}
        />
        <PasswordInput
          name="password"
          extraClass=""
          onChange={changePassword}
          value={password}
          icon="ShowIcon"
        />
        <Button
          htmlType="submit" type="primary" size="medium"
        >Войти</Button>
      </form>
      <p className={`mt-20 text text_type_main-default text_color_inactive`}>
        Вы - новый пользователь?
        <Link to={'/register'} >
          <Button htmlType="button" type="secondary" size="medium" extraClass={styles.link}>
            &emsp;Зарегистрироваться
          </Button>
        </Link>
      </p>
      <p className={`text text_type_main-default text_color_inactive`}>
        Забыли пароль?
        <Link to={'/forgot-password'} >
          <Button htmlType="button" type="secondary" size="medium" extraClass={styles.link}>
            &emsp;Восстановить пароль
          </Button>
        </Link>
      </p>
    </div>
  );
}

export default Login;
