import React, {useState} from "react";
import styles from './auth.module.css';
import {
  EmailInput, Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { postPasswordReset } from "../utils/api";
import { useDispatch } from "react-redux";
import { SET_PORTAL_API } from "../services/actions/portal";
import { FAILED } from "../utils/data";


function ForgotPassword() {

  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
    postPasswordReset(email)
      .then(data => {
        if (data?.success) {
          navigate('/reset-password', { replace: true, state: {from: location.pathname} });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({type: SET_PORTAL_API, text: FAILED});
      })
  }

  const changeEmail = (e) => {
    setEmail(e.target.value);
  }

  return (
    <div className={`${styles.container}`}>
      <h2
        className={`${styles.title} text text_type_main-medium`}
      >Восстановление пароля</h2>
      <form className={`${styles.form}`} onSubmit={onFormSubmit}>
        <EmailInput
          name="email"
          onChange={changeEmail}
          value={email}
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
