import React from "react";
import styles from "./ingredient.module.css"
import {
  Counter
} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import { ingredientPropTypes } from "../../../utils/prop-shapes";
import PropTypes from 'prop-types';

function Ingredient({
  data, setVisibleModal, setPortalType, setCurrIngredient,
  currIngredient
}) {

  const handleClick = (e) => {
    setCurrIngredient({
      ...currIngredient,
      ...data
    });
    setPortalType('IngredientDetails')
    setVisibleModal(true);
  }

  return (
    <div className={`${styles.ingredient}`} onClick={handleClick}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={data.image} alt={data.name} />
      <Price price={data.price} />
      <p className={`${styles.name} text text_type_main-default`}>{data.name}</p>
    </div>
  );
}

Ingredient.propTypes = {
  data: ingredientPropTypes.isRequired,
  setVisibleModal: PropTypes.func.isRequired,
  setPortalType: PropTypes.func.isRequired,
  setCurrIngredient: PropTypes.func.isRequired,
  currIngredient: ingredientPropTypes.isRequired,
}

export default Ingredient;
