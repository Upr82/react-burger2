import React from 'react';
import styles from "./burger-constructor.module.css";
import {
  Button, ConstructorElement, CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { postOrder } from '../../../services/actions/order-actions';
import { BUN } from '../../../utils/data';
import { useDrop } from 'react-dnd';
import { CONSTRUCTOR_ADD } from '../../../services/actions/constructor-actions';
import DragableIngredient from '../dragabe-ingredient/dragable-ingredient';
import { SET_PORTAL_ORDER } from '../../../services/actions/portal';
import { getCookie } from '../../../utils/cookie';
import { POST_LOGOUT } from '../../../services/actions/user';


function BurgerConstructor() {

  const dispatch = useDispatch();

  const getAllIngredients = store => store.currBurger.content;
  const allIngredients = useSelector(getAllIngredients);

  const getLoggedIn = store => store.user.loggedIn;
  const loggedIn = useSelector(getLoggedIn);

  const navigate = useNavigate();
  const location = useLocation();

  let accessToken = getCookie('accessToken') || '';
  let refreshToken = getCookie('refreshToken') || '';

  const [{ isHover }, drop] = useDrop({
    accept: "container",
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient) {
      dispatch({
        type: CONSTRUCTOR_ADD,
        ingredient
      });
    }
  });

  const borderColor = isHover ? 'lightgreen' : 'transparent';

  const currBun = allIngredients.length ? allIngredients.find(
    ingredient => ingredient.type === BUN
  ) : {};

  const sum = allIngredients.length ? allIngredients.reduce((acc, ingredient) => {
    return acc + ingredient.price;
  }, 0) : 0;

  const handleClick = () => {
    if (!allIngredients.length || allIngredients[0].type !== BUN) {
      return null;
    }

    if (!loggedIn) return navigate('/login', {state: {from: location.pathname}});

    if (!accessToken || !refreshToken) {
      console.log('Кук нет');
      dispatch({type: POST_LOGOUT});
      navigate('/login');
    }

    dispatch(postOrder([...allIngredients.map(item => item._id)]));
    dispatch({type: SET_PORTAL_ORDER});
  }


  return (
    <div className={`${styles.container} pt-25`} style={{ borderColor }} ref={drop}>
      <div className={`${styles.drag_container} ml-4 mr-4`}>
        {Object.entries(currBun).length !== 0 &&
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${currBun.name} (верх)`}
            price={currBun.price}
            thumbnail={currBun.image}
          />
        }
      </div>

      <ul className={`${styles.list}`}>
        {
          allIngredients.map((ingredient, index) => {
            if (ingredient.type !== BUN) {
              return (
                <li key={index} >
                  <DragableIngredient ingredient={ingredient} index={index} />
                </li>
              );
            }
            return null;
          })}
      </ul>

      <div className={`${styles.drag_container} ml-4 mr-4`}>
        {Object.entries(currBun).length !== 0 &&
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${currBun.name} (низ)`}
            price={currBun.price}
            thumbnail={currBun.image}
          />
        }
      </div>

      <div className={`${styles.submit_container} mt-10 mr-4`}>
        {sum !== 0 &&
          <div className={`${styles.sum_container} `}>
            <p className="text text_type_digits-medium">
              {sum}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        }

        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleClick}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
