import React, { useEffect } from "react";
import styles from './edit-profile.module.css';
import { useSelector, useDispatch } from "react-redux";
import {
  Input, EmailInput, PasswordInput, Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  EDIT_NAME, EDIT_EMAIL, EDIT_PASSWORD
} from "../../services/actions/profile";
import { POST_LOGOUT } from "../../services/actions/user";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { setCurrUserInProfile } from "../../services/actions/profile";
import { getUserThunk, patchUserThunk } from "../../services/actions/user";


const EditProfile = () => {

  const getProfileForm = (state: any) => state.profile;
  const { name, email, password } = useSelector(getProfileForm);

  const getUserFromState = (state: any) => state.user;
  const { name: userName, email: userEmail } = useSelector(getUserFromState);
  const dispatch = useDispatch();


  const navigate = useNavigate();

  let accessToken = getCookie('accessToken') || '';
  let refreshToken = getCookie('refreshToken') || '';

  useEffect(() => {
    if (accessToken && refreshToken) {

      // @ts-ignore
      dispatch(getUserThunk(accessToken, refreshToken));
    } else {
      console.log('Кук нет');
      dispatch({type: POST_LOGOUT});
      navigate('/login');
    }
    // @ts-ignore
    dispatch(setCurrUserInProfile(userName, userEmail));
    // eslint-disable-next-line
  }, []);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // @ts-ignore
    dispatch(patchUserThunk(
      getCookie('accessToken'), getCookie('refreshToken'),
      name, email, password
    ));
  }

  const handleReset = () => {
    // @ts-ignore
    dispatch(setCurrUserInProfile(userName, userEmail));
  }

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: EDIT_EMAIL,
      email: e.target.value
    });
  }

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: EDIT_PASSWORD,
      password: e.target.value
    });
  }

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: EDIT_NAME,
      name: e.target.value
    });
  }

  return (
    <>
      <form className={`${styles.form}`} onSubmit={e => onFormSubmit(e)}>
        <Input
          placeholder="Имя"
          type="text"
          onChange={e => changeName(e)}
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
