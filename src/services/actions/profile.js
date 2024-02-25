export const EDIT_NAME = 'EDIT_NAME';
export const EDIT_EMAIL = 'EDIT_EMAIL';
export const EDIT_PASSWORD = 'EDIT_PASSWORD';


export function setCurrUserInProfile(userName, userEmail) {
  return function (dispatch) {
    dispatch({
      type: EDIT_NAME,
      name: userName
    });
    dispatch({
      type: EDIT_EMAIL,
      email: userEmail
    });
    dispatch({
      type: EDIT_PASSWORD,
      password: ''
    });
  }
}
