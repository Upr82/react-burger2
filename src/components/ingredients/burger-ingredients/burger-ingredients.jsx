import React, { useState, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import IngredientsMenu from "../ingredients-menu/ingredients-menu";
import IngredientsContainer from "../ingredients-container/ingredients-container";
import PropTypes from 'prop-types';
import { ingredientPropTypes } from "../../../utils/prop-shapes";
import { BUN, SAUCE, MAIN } from "../../../utils/data";

function BurgerIngredients({data}) {
  const [nearTitle, setNearTitle] = useState(BUN);

  const containerElement = useRef();
  const bunElement = useRef();
  const sauceElement = useRef();
  const mainElement = useRef();

  const titleRefs = {
    bunRef: bunElement,
    sauceRef: sauceElement,
    mainRef: mainElement,
  }

  const handleScrolling = (e) => {
    const scrollContainer = e.target.scrollTop + containerElement.current.offsetTop;
    if (scrollContainer < sauceElement.current.offsetTop) {
      if (
        Math.abs(scrollContainer - bunElement.current.offsetTop) <
        Math.abs(scrollContainer - sauceElement.current.offsetTop)
      ) return setNearTitle(BUN);
      return setNearTitle(SAUCE);
    } else {
      if (
        Math.abs(scrollContainer - sauceElement.current.offsetTop) <
        Math.abs(scrollContainer - mainElement.current.offsetTop)
      ) return setNearTitle(SAUCE);
      return setNearTitle(MAIN);
    }
  }

  return (
    <div className={`${styles.container}`}>
      <h2 className={`${styles.title} mt-10 mb-5 text text_type_main-large`}>
        Соберите бургер
      </h2>
      <IngredientsMenu nearTitle={nearTitle} ref={titleRefs}/>
      <div
        className={`${styles.sub_container}`}
        onScroll={handleScrolling}
        ref={containerElement}
      >
        <IngredientsContainer
          data={data}
          ref={titleRefs}
        />
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired
};

export default BurgerIngredients;
