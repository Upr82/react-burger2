import React, { useState } from "react";
import styles from "./burger-ingredients.module.css";
import IngredientsMenu from "../ingredients-menu/ingredients-menu";
import IngredientsContainer from "../ingredients-container/ingredients-container";
import PropTypes from 'prop-types';
import { ingredientPropTypes } from "../../../utils/prop-shapes";
import { BUN, SAUCE, MAIN } from "../../../utils/data";

function BurgerIngredients({
  data,
  openModal,
  setPortalType,
}) {
  const [nearTitle, setNearTitle] = useState(BUN);

  const containerElement = document.getElementById('scrollContainer');
  const bunElement = document.getElementById(BUN);
  const sauceElement = document.getElementById(SAUCE);
  const mainElement = document.getElementById(MAIN);

  const handleScrolling = (e) => {
    const scrollContainer = e.target.scrollTop + containerElement.offsetTop;
    if (scrollContainer < sauceElement.offsetTop) {
      if (
        Math.abs(scrollContainer-bunElement.offsetTop) <
        Math.abs(scrollContainer-sauceElement.offsetTop)
      ) {
        setNearTitle(BUN)
      } else {
        setNearTitle(SAUCE);
      }
    } else {
      if (
        Math.abs(scrollContainer-sauceElement.offsetTop) <
        Math.abs(scrollContainer-mainElement.offsetTop)
      ) {
        setNearTitle(SAUCE);
      } else {
        setNearTitle(MAIN);
      }
    }

  }

  return (
    <div className={`${styles.container}`}>
      <h2 className={`${styles.title} mt-10 mb-5 text text_type_main-large`}>
        Соберите бургер
      </h2>
      <IngredientsMenu nearTitle={nearTitle}/>
      <div
        className={`${styles.sub_container}`}
        onScroll={handleScrolling}
      id="scrollContainer">
        <IngredientsContainer
          data={data}
          openModal={openModal}
          setPortalType={setPortalType}
        />
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  openModal: PropTypes.func.isRequired,
  setPortalType: PropTypes.func.isRequired,
};

export default BurgerIngredients;
