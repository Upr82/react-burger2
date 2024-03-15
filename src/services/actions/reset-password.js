import { postPasswordToken } from "../../utils/api";
import { SET_PORTAL_API } from "./portal";
import { FAILED } from "../../utils/data";


export const postResetPasswordThunk = (password, token, navigate, location) => {
  return function (dispatch) {
    postPasswordToken(password, token)
      .then(data => {
        if (data?.success) {
          navigate('/login', { replace: true, state: { from: location.pathname } });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: SET_PORTAL_API, text: FAILED });
      })
  }
}
