import React from "react";
import styles from './ingredient-details.module.css';
import { ingredientPropTypes } from "../../utils/prop-shapes";

const IngredientDetails = ({ingredient}) => {

  return (
    <>
      <p className={`${styles.title} text text_type_main-large`}>
        Детали ингредиента
      </p>
      <img className={`${styles.img} `}
        src={ingredient.image_large} alt={ingredient.name}
      />
      <p className={`${styles.name} text text_type_main-medium mt-4`}>
        {ingredient.name}
      </p>
      <div className={`${styles.structure} mt-8`}>
        <div className={`${styles.fats}`}>
          <p className={`${styles.fats_name} text text_type_main-default text_color_inactive`}>
            Калории,ккал
          </p>
          <p className={`${styles.fats_value} text_type_digits-default text_color_inactive`}>
            {ingredient.calories}
          </p>
        </div>

        <div className={`${styles.fats}`}>
          <p className={`${styles.fats_name} text text_type_main-default text_color_inactive`}>
            Белки, г
          </p>
          <p className={`${styles.fats_value} text_type_digits-default text_color_inactive`}>
            {ingredient.proteins}
          </p>
        </div>
        <div className={`${styles.fats}`}>
          <p className={`${styles.fats_name} text text_type_main-default text_color_inactive`}>
            Жиры, г
          </p>
          <p className={`${styles.fats_value} text_type_digits-default text_color_inactive`}>
            {ingredient.fat}
          </p>
        </div>
        <div className={`${styles.fats}`}>
          <p className={`${styles.fats_name} text text_type_main-default text_color_inactive`}>
            Углеводы, г
          </p>
          <p className={`${styles.fats_value} text_type_digits-default text_color_inactive`}>
            {ingredient.carbohydrates}
          </p>
        </div>

      </div>
    </>
  );
}

IngredientDetails.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
}

export default IngredientDetails;
