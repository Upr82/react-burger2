import React from "react";
import styles from "./burger-ingredients.module.css";
import IngredientsMenu from "../ingredients-menu/ingredients-menu";
import IngredientsContainer from "../ingredients-container/ingredients-container";
import PropTypes from 'prop-types';
import { ingredientPropTypes } from "../../../utils/prop-shapes";

function BurgerIngredients({
  data, setVisibleModal, setPortalType, setCurrIngredient,
  currIngredient
}) {

  return (
    <div className={`${styles.container}`}>
      <h2 className={`${styles.title} mt-10 mb-5 text text_type_main-large`}>
        Соберите бургер
      </h2>
      <IngredientsMenu />
      <IngredientsContainer
        data={data}
        setVisibleModal={setVisibleModal}
        setPortalType={setPortalType}
        currIngredient={currIngredient}
        setCurrIngredient={setCurrIngredient}
      />
    </div>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  setVisibleModal: PropTypes.func.isRequired,
  setPortalType: PropTypes.func.isRequired,
  setCurrIngredient: PropTypes.func.isRequired,
  currIngredient: ingredientPropTypes,
};

export default BurgerIngredients;
