import React from "react";
import styles from "./ingredients-container.module.css"
import Ingredient from "../ingredient/ingredient";
import PropTypes from 'prop-types';
import { ingredientPropTypes } from "../../../utils/prop-shapes";

function IngredientsContainer({
  data, setVisibleModal, setPortalType, setCurrIngredient,
  currIngredient
}) {


  return (
    <div className={`${styles.container} `}>
      <h3
        className={`mt-10 mb-6 text text_type_main-medium`}
        id="bun"
      >Булки</h3>
      <ul className={`${styles.list} pl-4 pr-4`}>
          {data.map(ingredient => {
            if (ingredient.type === "bun") {
              return (
                <li key={ingredient._id}>
                  <Ingredient
                    data={ingredient}
                    setVisibleModal={setVisibleModal}
                    setPortalType={setPortalType}
                    currIngredient={currIngredient}
                    setCurrIngredient={setCurrIngredient}
                  />
                </li>
              );
            }
            return null;
          })}
      </ul>

      <h3
        className={`mt-10 mb-6 text text_type_main-medium`}
        id="sauce"
      >Соусы</h3>
      <ul className={`${styles.list} pl-4 pr-4`}>
          {data.map(ingredient => {
            if (ingredient.type === "sauce") {
              return (
                <li key={ingredient._id}>
                  <Ingredient
                    data={ingredient}
                    setVisibleModal={setVisibleModal}
                    setPortalType={setPortalType}
                    currIngredient={currIngredient}
                    setCurrIngredient={setCurrIngredient}
                  />
                </li>
              );
            }
            return null;
          })}
      </ul>

      <h3
        className={`mt-10 mb-6 text text_type_main-medium`}
        id="main"
      >Начинки</h3>
      <ul className={`${styles.list} pl-4 pr-4`}>
          {data.map(ingredient => {
            if (ingredient.type === "main") {
              return (
                <li key={ingredient._id}>
                  <Ingredient
                    data={ingredient}
                    setVisibleModal={setVisibleModal}
                    setPortalType={setPortalType}
                    currIngredient={currIngredient}
                    setCurrIngredient={setCurrIngredient}
                  />
                </li>
              );
            }
            return null;
          })}
      </ul>
    </div>
  );
}

IngredientsContainer.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  setVisibleModal: PropTypes.func.isRequired,
  setPortalType: PropTypes.func.isRequired,
  setCurrIngredient: PropTypes.func.isRequired,
  currIngredient: ingredientPropTypes.isRequired,
}

export default IngredientsContainer;
