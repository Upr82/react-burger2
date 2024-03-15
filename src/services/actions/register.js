import { setCookie } from "../../utils/cookie";
import { postRegister } from "../../utils/api";
import { POST_LOGIN_SUCCESS } from "./user";
import { SET_PORTAL_API } from "./portal";
import { FAILED } from "../../utils/data";

export const INPUT_REG_NAME = 'INPUT_REG_NAME';
export const INPUT_REG_EMAIL = 'INPUT_REG_EMAIL';
export const INPUT_REG_PASSWORD = 'INPUT_REG_PASSWORD';


export const postRegisterThunk = (name, email, password, navigate) => {
  return function (dispatch) {
    postRegister(name, email, password)
      .then(data => {
        if (data.success && data.accessToken && data.refreshToken) {
          setCookie('accessToken', data.accessToken);
          setCookie('refreshToken', data.refreshToken);
          dispatch({
            type: POST_LOGIN_SUCCESS,
            name: data.user.name,
            email: data.user.email
          })
          navigate('/', { replace: true });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: SET_PORTAL_API, text: FAILED });
      });
  }
}
