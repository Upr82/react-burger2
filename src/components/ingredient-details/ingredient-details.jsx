import React from "react";
import styles from './ingredient-details.module.css';
import { useSelector } from "react-redux";

const IngredientDetails = () => {

  const {
    name, image_large, calories,
    proteins, fat, carbohydrates
  } = useSelector(store => store.currIngredient.description);

  return (
    <>
      <p className={`${styles.title} text text_type_main-large`}>
        Детали ингредиента
      </p>
      <img className={`${styles.img} `}
        src={image_large} alt={name}
      />
      <p className={`${styles.name} text text_type_main-medium mt-4`}>
        {name}
      </p>
      <div className={`${styles.structure} mt-8`}>
        <div className={`${styles.fats}`}>
          <p className={`${styles.fats_name} text text_type_main-default text_color_inactive`}>
            Калории,ккал
          </p>
          <p className={`${styles.fats_value} text_type_digits-default text_color_inactive`}>
            {calories}
          </p>
        </div>

        <div className={`${styles.fats}`}>
          <p className={`${styles.fats_name} text text_type_main-default text_color_inactive`}>
            Белки, г
          </p>
          <p className={`${styles.fats_value} text_type_digits-default text_color_inactive`}>
            {proteins}
          </p>
        </div>
        <div className={`${styles.fats}`}>
          <p className={`${styles.fats_name} text text_type_main-default text_color_inactive`}>
            Жиры, г
          </p>
          <p className={`${styles.fats_value} text_type_digits-default text_color_inactive`}>
            {fat}
          </p>
        </div>
        <div className={`${styles.fats}`}>
          <p className={`${styles.fats_name} text text_type_main-default text_color_inactive`}>
            Углеводы, г
          </p>
          <p className={`${styles.fats_value} text_type_digits-default text_color_inactive`}>
            {carbohydrates}
          </p>
        </div>

      </div>
    </>
  );
}

export default IngredientDetails;
