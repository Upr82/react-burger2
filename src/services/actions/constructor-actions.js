export const CONSTRUCTOR_ADD = 'CONSTRUCTOR_ADD';
export const CONSTRUCTOR_DEL = 'CONSTRUCTOR_DEL';
export const MOVING_FILLINGS = 'MOVING_FILLINGS';

export function addIngredient(ingredient) {
  return function (dispatch) {
    dispatch({
      type: CONSTRUCTOR_ADD,
      ingredient
    })
  }
};

export function delIngredient(ingredient, index) {
  return function (dispatch) {
    dispatch({
      type: CONSTRUCTOR_DEL,
      ingredient,
      index
    });
  }
};

export function movingFillings(sourceIndex, targetIndex) {
  return function (dispatch) {
    dispatch({
      type: MOVING_FILLINGS,
      sourceIndex,
      targetIndex
    });
  }
}
