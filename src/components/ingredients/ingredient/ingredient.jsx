import React, { useMemo } from "react";
import styles from "./ingredient.module.css"
import {
  Counter
} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import { ingredientPropTypes } from "../../../utils/prop-shapes";
import { useDispatch, useSelector } from "react-redux";
import { CURR_INGREDIENT_ADD } from "../../../services/actions/curr-ingredient-actions";
import { useDrag } from "react-dnd";
import { SET_PORTAL_INGREDIENT } from "../../../services/actions/portal";
import { useNavigate, useLocation } from "react-router-dom";

function Ingredient({
  data
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
  const navigate = useNavigate();
  const location = useLocation();

  const getBurgerContent = store => store.currBurger.content;
  const burgerContent = useSelector(getBurgerContent);

  const count = useMemo(() =>
    burgerContent.filter(item => item._id === data._id).length
  ,[burgerContent, data._id]);

  const handleClick = () => {
    dispatch({
      type: CURR_INGREDIENT_ADD,
      description: data
    });
    dispatch({type: SET_PORTAL_INGREDIENT, portalVisible: true});
    navigate(`ingredients/${data._id}`, {state: {background: location}});
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
  data: ingredientPropTypes.isRequired
}

export default Ingredient;
