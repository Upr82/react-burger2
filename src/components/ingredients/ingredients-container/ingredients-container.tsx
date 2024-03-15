import React from "react";
import styles from "./ingredients-container.module.css"
import Ingredient from "../ingredient/ingredient";
import { BUN, SAUCE, MAIN } from "../../../utils/data";
import { IIngredient, ITitleRefs } from "../../../services/types/types";

type TIngredientsContainer = {
  data: IIngredient[],
  refs: ITitleRefs
}


const IngredientsContainer = ({data, refs}: TIngredientsContainer) => {

  const { bunRef, sauceRef, mainRef } = refs;

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
}

export default IngredientsContainer;
