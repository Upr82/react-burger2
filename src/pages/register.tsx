import React from "react";
import styles from './auth.module.css';
import {
  PasswordInput, EmailInput, Input, Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import {
  INPUT_REG_NAME, INPUT_REG_EMAIL, INPUT_REG_PASSWORD
} from "../services/actions/register";
import { useDispatch, useSelector } from "react-redux";
import { postRegisterThunk } from "../services/actions/register";

function Register() {

  const getRegisterForm = (store: any) => store.register;
  const { name, email, password } = useSelector(getRegisterForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // @ts-ignore
    dispatch(postRegisterThunk(name, email, password, navigate));
  }

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: INPUT_REG_EMAIL,
      email: e.target.value
    });
  }

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: INPUT_REG_PASSWORD,
      password: e.target.value
    });
  }

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: INPUT_REG_NAME,
      name: e.target.value
    });
  }

  return (
    <div className={`${styles.container}`}>
      <h2
        className={`${styles.title} text text_type_main-medium`}
      >Регистрация</h2>
      <form className={`${styles.form}`} onSubmit={onFormSubmit}>
        <Input
          placeholder="Имя"
          type="text"
          onChange={changeName}
          value={name}
          name="name"
          error={false}
          errorText="Ошибка"
          size="default"
          extraClass=""
        />
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
        >Зарегистрироваться</Button>
      </form>
      <p className={`mt-20 text text_type_main-default text_color_inactive`}>
        Уже зарегистрированы?
        <Link to={'/login'} >
          <Button htmlType="button" type="secondary" size="medium" extraClass={styles.link}>
            &emsp;Войти
          </Button>
        </Link>
      </p>
    </div>
  );
}

export default Register;
