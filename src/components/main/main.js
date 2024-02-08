import React from "react";
import styles from "./main.module.css";
import BurgerConstructor from "../constructor/burger-constructor/burger-construcor";
import BurgerIngredients from "../ingredients/burger-ingredients/burger-ingredients";
import PropTypes from 'prop-types';
import { ingredientPropTypes } from "../../utils/prop-shapes";

function Main({
  ingredients,
  openModal,
  setPortalType, setCurrIngredient,
  currIngredient,
  setOrderNumber
}) {
  return (
    <main className={`${styles.main}`}>
      {ingredients.length &&
        <>
          <BurgerIngredients
            data={ingredients}
            openModal={openModal}
            setPortalType={setPortalType}
            currIngredient={currIngredient}
            setCurrIngredient={setCurrIngredient}
          />
          <BurgerConstructor
            openModal={openModal}
            setPortalType={setPortalType}
            setOrderNumber={setOrderNumber}
          />
        </>
      }

    </main>
  );
}

Main.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  openModal: PropTypes.func.isRequired,
  setPortalType: PropTypes.func.isRequired,
  setCurrIngredient: PropTypes.func.isRequired,
  currIngredient: ingredientPropTypes,
  setOrderNumber: PropTypes.func.isRequired
};

export default Main;
