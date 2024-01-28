import React from "react";
import styles from "./main.module.css";
import BurgerConstructor from "../constructor/burger-constructor/burger-construcor";
import BurgerIngredients from "../ingredients/burger-ingredients/burger-ingredients";
import PropTypes from 'prop-types';
import { ingredientPropTypes } from "../../utils/prop-shapes";

function Main({
  ingredients, currBun, currFillings,
  setVisibleModal, setPortalType, setCurrIngredient,
  currIngredient
}) {
  return (
    <main className={`${styles.main}`}>
      {ingredients.length &&
        <>
          <BurgerIngredients
            data={ingredients}
            setVisibleModal={setVisibleModal}
            setPortalType={setPortalType}
            currIngredient={currIngredient}
            setCurrIngredient={setCurrIngredient}
          />
          <BurgerConstructor
            currBun={currBun}
            currFillings={currFillings}
            setVisibleModal={setVisibleModal}
            setPortalType={setPortalType}
          />
        </>
      }

    </main>
  );
}

Main.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  currBun: ingredientPropTypes,
  currFillings: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  setVisibleModal: PropTypes.func.isRequired,
  setPortalType: PropTypes.func.isRequired,
  setCurrIngredient: PropTypes.func.isRequired,
  currIngredient: ingredientPropTypes
};

export default Main;
