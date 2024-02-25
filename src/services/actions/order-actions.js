import { postCreateOrderRequest } from "../../utils/api";

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export function postOrder(ingredients) {
  return function(dispatch) {
    postCreateOrderRequest(ingredients)
    .then(data =>
      dispatch({
        type: POST_ORDER_SUCCESS,
        order: {...data}
      })
    )
    .catch(error => {
      console.log(error);
      dispatch({
        type: POST_ORDER_FAILED
      });
    });
  }
};
