import React from "react";
import styles from './order-details.module.css';
import image from "../../vendor/images/done.svg";
import { useSelector } from "react-redux";

function OrderDetails() {

  const { order } = useSelector(state => state.order);

  return (
    <>
      { order.success &&
        <h2 className={`${styles.order_id} text text_type_digits-large mt-20`}>
          {order.order.number}
        </h2>
      }
      <p className={`text text_type_main-medium mt-8`}>
        идентификатор заказа
      </p>
      <img className={`${styles.img} mt-15`} src={image} alt="done"/>
      <p className={`${styles.status} text text_type_main-default mt-15`}>
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}


export default OrderDetails;
