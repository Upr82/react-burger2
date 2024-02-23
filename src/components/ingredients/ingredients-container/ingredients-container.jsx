import React from "react";
import styles from "./ingredients-container.module.css"
import Ingredient from "../ingredient/ingredient";
import PropTypes from 'prop-types';
import { ingredientPropTypes } from "../../../utils/prop-shapes";
import { BUN, SAUCE, MAIN } from "../../../utils/data";


const IngredientsContainer = React.forwardRef(({data}, ref) => {

  const { bunRef, sauceRef, mainRef } = ref;

  return (
    <>
      <h3
        className={`mt-10 mb-6 text text_type_main-medium`}
        ref={bunRef}
      >Булки</h3>
      <ul className={`${styles.list} pl-4 pr-4`}>
          {data.map(ingredient => {
            if (ingredient.type === BUN) {
              return (
                <li key={ingredient._id}>
                  <Ingredient
                    data={ingredient}
                  />
                </li>
              );
            }
            return null;
          })}
      </ul>

      <h3
        className={`mt-10 mb-6 text text_type_main-medium`}
        ref={sauceRef}
      >Соусы</h3>
      <ul className={`${styles.list} pl-4 pr-4`}>
          {data.map(ingredient => {
            if (ingredient.type === SAUCE) {
              return (
                <li key={ingredient._id}>
                  <Ingredient
                    data={ingredient}
                  />
                </li>
              );
            }
            return null;
          })}
      </ul>

      <h3
        className={`mt-10 mb-6 text text_type_main-medium`}
        ref={mainRef}
      >Начинки</h3>
      <ul className={`${styles.list} pl-4 pr-4`}>
          {data.map(ingredient => {
            if (ingredient.type === MAIN) {
              return (
                <li key={ingredient._id}>
                  <Ingredient
                    data={ingredient}
                  />
                </li>
              );
            }
            return null;
          })}
      </ul>
    </>
  );
})

IngredientsContainer.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired
}

export default IngredientsContainer;
