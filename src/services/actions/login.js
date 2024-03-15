import { POST_LOGIN, POST_LOGIN_SUCCESS, POST_LOGIN_FAILED } from "./user";
import { postLogin } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import { SET_PORTAL_API } from "./portal";
import { FAILED } from "../../utils/data";


export const INPUT_LOGIN_EMAIL = 'INPUT_LOGIN_EMAIL';
export const INPUT_LOGIN_PASSWORD = 'INPUT_LOGIN_PASSWORD';
export const LOGIN_FINAL = 'LOGIN_FINAL';


export const postLoginThunk = (navigate, from, email, password) => {
  return function (dispatch) {
    dispatch({ type: POST_LOGIN });
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
          dispatch({ type: LOGIN_FINAL });
          navigate(from?.pathname || "/", { replace: true });
        } else {
          dispatch({ type: POST_LOGIN_FAILED });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: POST_LOGIN_FAILED });
        dispatch({ type: SET_PORTAL_API, text: FAILED });
      });

  }
}
