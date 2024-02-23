import React, { useState } from "react";
import styles from './auth.module.css';
import {
  PasswordInput, Input, Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { postPasswordToken } from "../utils/api";
import { useDispatch } from "react-redux";
import { SET_PORTAL_API } from "../services/actions/portal";
import { FAILED } from "../utils/data";


function ResetPassword() {

  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onFormSubmit = (e) => {
    e.preventDefault();
    postPasswordToken(password, token)
      .then(data => {
        if (data?.success) {
          navigate('/login', {replace: true, state: {from: location.pathname}});
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({type: SET_PORTAL_API, text: FAILED});
      })
  }

  const changePassword = (e) => {
    setPassword(e.target.value);
  }

  const changeCode = (e) => {
    setToken(e.target.value);
  }

  return (
    <div className={`${styles.container}`}>
      <h2
        className={`${styles.title} text text_type_main-medium`}
      >Восстановление пароля</h2>
      <form className={`${styles.form}`} onSubmit={onFormSubmit}>
        <PasswordInput
          name="password"
          extraClass="mb-2"
          onChange={changePassword}
          value={password}
          placeholder="Введите новый пароль"
          icon="ShowIcon"
        />
        <Input
          placeholder="Введите код из письма"
          type="text"
          onChange={changeCode}
          value={token}
          name="code"
          error={false}
          errorText="Ошибка"
          size="default"
        />
        <Button
          htmlType="submit" type="primary" size="medium"
        >Сохранить</Button>
      </form>
      <p className={`mt-20 text text_type_main-default text_color_inactive`}>
        Вспомнили пароль?
        <Link to={'/login'} >
          <Button htmlType="button" type="secondary" size="medium" extraClass={styles.link}>
          &emsp;Войти
          </Button>
        </Link>
      </p>
    </div>
  );
}

export default ResetPassword;
