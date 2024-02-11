import React from "react";
import styles from "./ingredients-container.module.css"
import Ingredient from "../ingredient/ingredient";
import PropTypes from 'prop-types';
import { ingredientPropTypes } from "../../../utils/prop-shapes";
import { BUN, SAUCE, MAIN } from "../../../utils/data";


const IngredientsContainer = React.forwardRef(({
  data,
  openModal,
  setPortalType},
  ref
) => {

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
                    openModal={openModal}
                    setPortalType={setPortalType}
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
                    openModal={openModal}
                    setPortalType={setPortalType}
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
                    openModal={openModal}
                    setPortalType={setPortalType}
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
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  openModal: PropTypes.func.isRequired,
  setPortalType: PropTypes.func.isRequired,
  // ref: PropTypes.shape({
  //   bunRef: [PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })],
  //   sauceRef: [PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })],
  //   mainRef: [PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]
  // }).isRequired
}

export default IngredientsContainer;
