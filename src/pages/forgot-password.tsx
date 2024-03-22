import React, {FC} from "react";
import styles from './auth.module.css';
import {
  EmailInput, Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "../hooks/useForm";
import { postForgotPasswordThunk } from "../services/actions/forgot-password";


const ForgotPassword: FC = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { values, handleChange } = useForm({
    email: '',
  })

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(postForgotPasswordThunk(location, navigate, values.email));

  }

  return (
    <div className={`${styles.container}`}>
      <h2
        className={`${styles.title} text text_type_main-medium`}
      >Восстановление пароля</h2>
      <form className={`${styles.form}`} onSubmit={onFormSubmit}>
        <EmailInput
          name="email"
          onChange={handleChange}
          value={values.email}
          isIcon={false}
          disabled={false}
          placeholder="Укажите e-mail"
        />
        <Button
          htmlType="submit" type="primary" size="medium"
        >Восстановить</Button>
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

export default ForgotPassword;
