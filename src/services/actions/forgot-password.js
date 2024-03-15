import { SET_PORTAL_API } from "./portal";
import { FAILED } from "../../utils/data";
import { postPasswordReset } from "../../utils/api";

export const postForgotPasswordThunk = (location, navigate, email) => {
  return function (dispatch) {
    postPasswordReset(email)
      .then(data => {
        if (data?.success) {
          navigate('/reset-password', { state: {from: location.pathname} });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({type: SET_PORTAL_API, text: FAILED});
      })
  }}
