import React from "react";
import styles from './auth.module.css';
import {
  PasswordInput, EmailInput, Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { postLogin } from "../utils/api";
import { useSelector, useDispatch } from "react-redux";
import {
  INPUT_LOGIN_EMAIL, INPUT_LOGIN_PASSWORD, LOGIN_FINAL
} from "../services/actions/login";
import {
  POST_LOGIN, POST_LOGIN_SUCCESS, POST_LOGIN_FAILED
} from "../services/actions/user";
import { setCookie } from "../utils/cookie";
import { SET_PORTAL_API } from "../services/actions/portal";
import { FAILED } from "../utils/data";

function Login() {

  const location = useLocation();

  const getLoginForm = store => store.login;
  const { email, password } = useSelector(getLoginForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { from } = location.state || {};

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch({type: POST_LOGIN});
    postLogin(email, password)
    .then(data => {
      if (data.success) {
        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken);
        dispatch({
          type: POST_LOGIN_SUCCESS,
          name: data.user.name,
          email: data.user.email
        })
        dispatch({type: LOGIN_FINAL});
        navigate(from?.pathname || "/", { replace: true });
      } else {
        dispatch({type: POST_LOGIN_FAILED});
      }
    })
    .catch(error => {
      console.log(error);
      dispatch({type: POST_LOGIN_FAILED});
      dispatch({type: SET_PORTAL_API, text: FAILED});
    });
  }

  const changeEmail = (e) => {
    dispatch({
      type: INPUT_LOGIN_EMAIL,
      email: e.target.value
    });
  }

  const changePassword = (e) => {
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
