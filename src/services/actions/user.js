import { getUser, patchUser } from "../../utils/api";
import { SET_PORTAL_API } from "./portal";
import { SUCCESS, FAILED } from "../../utils/data";
import { setCurrUserInProfile } from "./profile";


export const POST_LOGIN = 'POST_LOGIN';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_FAILED = 'POST_LOGIN_FAILED';
export const POST_LOGOUT = 'POST_LOGOUT';


export const getUserThunk = (accessToken, refreshToken) => {
  return function (dispatch) {
    getUser(accessToken, refreshToken)
      .then(data => {
        dispatch({
          type: POST_LOGIN_SUCCESS,
          name: data.user.name,
          email: data.user.email
        });
      })
      .catch(Error);
  }
}


export const patchUserThunk = (accessToken, refreshToken, name, email, password) => {
  return function (dispatch) {
    patchUser(accessToken, refreshToken, name, email, password)
      .then(data => {
        dispatch({
          type: POST_LOGIN_SUCCESS,
          name: data.user.name,
          email: data.user.email
        });
        // @ts-ignore
        dispatch(setCurrUserInProfile(data.user.name, data.user.email));
        dispatch({ type: SET_PORTAL_API, text: SUCCESS });
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: SET_PORTAL_API, text: FAILED });
      });
  }
}
