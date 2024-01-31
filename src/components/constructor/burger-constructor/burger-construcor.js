import React, { useEffect } from 'react';
import styles from "./burger-constructor.module.css";
import {
  Button, ConstructorElement, CurrencyIcon, DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/prop-shapes';


function BurgerConstructor({
  currBun, currFillings, setPortalType,
  openModal
}) {
  const sum = currFillings.reduce((acc, ingredient) => {
    return acc + ingredient.price;
  }, currBun.price*2);

  const handleClick = (e) => {
    setPortalType('OrderDetails');
    openModal();
  }

  return (
    <div className={`${styles.container} pt-25`}>
      {Object.entries(currBun).length &&
        <div className={`${styles.drag_container} ml-4 mr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${currBun.name} (верх)`}
            price={currBun.price}
            thumbnail={currBun.image}
          />
        </div>
      }

      <ul className={`${styles.list}`}>
        {currFillings.map((ingredient, index) => {
            return (
              <li key={ingredient._id}>
                <div className={`${styles.drag_container} ml-4 mr-2`}>
                  <ConstructorElement
                    text={`${ingredient.name}`}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                  />
                  <DragIcon type="primary" />
                </div>
              </li>
            );
        })}
      </ul>

      {Object.entries(currBun).length &&
        <div className={`${styles.drag_container} ml-4 mr-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${currBun.name} (низ)`}
            price={currBun.price}
            thumbnail={currBun.image}
          />
        </div>
      }

      <div className={`${styles.submit_container} mt-10 mr-4`}>
        <div className={`${styles.sum_container} `}>
          <p className="text text_type_digits-medium">
            {sum}
          </p>
          <CurrencyIcon type="primary" />
        </div>
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

BurgerConstructor.propTypes = {
  currBun: ingredientPropTypes,
  currFillings: PropTypes.arrayOf(ingredientPropTypes),
  setPortalType: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired
};

export default BurgerConstructor;
