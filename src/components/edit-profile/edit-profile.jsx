import React, { useEffect } from "react";
import styles from './edit-profile.module.css';
import { useSelector, useDispatch } from "react-redux";
import {
  Input, EmailInput, PasswordInput, Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  EDIT_NAME, EDIT_EMAIL, EDIT_PASSWORD
} from "../../services/actions/profile";
import { POST_LOGIN_SUCCESS, POST_LOGOUT } from "../../services/actions/user";
import { useNavigate } from "react-router-dom";
import { patchUser } from "../../utils/api";
import { getCookie } from "../../utils/cookie";
import { getUser } from "../../utils/api";
import { setCurrUserInProfile } from "../../services/actions/profile";
import { SUCCESS, FAILED } from "../../utils/data";
import { SET_PORTAL_API } from "../../services/actions/portal";

const EditProfile = () => {

  const getProfileForm = state => state.profile;
  const { name, email, password } = useSelector(getProfileForm);

  const getUserFromState = state => state.user;
  const { name: userName, email: userEmail } = useSelector(getUserFromState);
  const dispatch = useDispatch();


  const navigate = useNavigate();

  let accessToken = getCookie('accessToken') || '';
  let refreshToken = getCookie('refreshToken') || '';

  useEffect(() => {
    if (accessToken && refreshToken) {
      getUser(getCookie('accessToken'), getCookie('refreshToken'))
      .then(data => {
        dispatch({
          type: POST_LOGIN_SUCCESS,
          name: data.user.name,
          email: data.user.email
        });
      })
      .catch(Error);
    } else {
      console.log('Кук нет');
      dispatch({type: POST_LOGOUT});
      navigate('/login');
    }
    dispatch(setCurrUserInProfile(userName, userEmail));
  }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    patchUser(
      getCookie('accessToken'),
      getCookie('refreshToken'),
      name, email, password
    )
    .then(data => {
      dispatch({
        type: POST_LOGIN_SUCCESS,
        name: data.user.name,
        email: data.user.email
      });
      dispatch(setCurrUserInProfile(data.user.name, data.user.email));
      dispatch({type: SET_PORTAL_API, text: SUCCESS});
    })
    .catch(error => {
      console.log(error);
      dispatch({type: SET_PORTAL_API, text: FAILED});
    });
  }

  const handleReset = () => {
    dispatch(setCurrUserInProfile(userName, userEmail));
  }

  const changeEmail = (e) => {
    dispatch({
      type: EDIT_EMAIL,
      email: e.target.value
    });
  }

  const changePassword = (e) => {
    dispatch({
      type: EDIT_PASSWORD,
      password: e.target.value
    });
  }

  const changeName = (e) => {
    dispatch({
      type: EDIT_NAME,
      name: e.target.value
    });
  }

  return (
    <>
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
        >Сохранить</Button>
        <Button
          htmlType="reset" type="primary" size="medium"
          onClick={handleReset}
        >Отмена</Button>
      </form>
    </>
  );
}

export default EditProfile;
