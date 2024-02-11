import React from "react";
import styles from "./ingredient.module.css"
import {
  Counter
} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import { ingredientPropTypes } from "../../../utils/prop-shapes";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { CURR_INGREDIENT_ADD } from "../../../services/actions/curr-ingredient-actions";
import { useDrag } from "react-dnd";

function Ingredient({
  data,
  openModal,
  setPortalType,
}) {

  const [{ isDrag }, dragRef] = useDrag({
    type: 'container',
    item: data,
    collect: monitor => ({
      isDrag: monitor.isDragging(),
      currItem: monitor.getItem(),
    })
  });

  const borderColor = isDrag ? 'lightgreen' : 'transparent';


  const dispatch = useDispatch();

  const burgerContent = useSelector(store => store.currBurger.content);
  const count = burgerContent.length ? burgerContent.filter(item => item._id === data._id).length : 0;

  const handleClick = () => {
    dispatch({
      type: CURR_INGREDIENT_ADD,
      description: data
    });
    setPortalType('IngredientDetails')
    openModal();
  }

  return (
    <div
      className={`${styles.ingredient}`}
      onClick={handleClick} ref={dragRef}
      style={{borderColor}}
    >
      {count ? <Counter count={count} size="default" extraClass="m-1" /> : ''}
      <img src={data.image} alt={data.name} />
      <Price price={data.price} />
      <p className={`${styles.name} text text_type_main-default`}>{data.name}</p>
    </div>
  );
}

Ingredient.propTypes = {
  data: ingredientPropTypes.isRequired,
  openModal: PropTypes.func.isRequired,
  setPortalType: PropTypes.func.isRequired,
}

export default Ingredient;
