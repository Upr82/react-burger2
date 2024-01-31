import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./price.module.css";
import PropTypes from 'prop-types';

function Price({price}) {

  return (
    <div className={`${styles.container} mt-1 mb-1`}>
      <p className="text text_type_digits-default">{price}</p>
      <CurrencyIcon type="primary" />
    </div>
  );
}

Price.propTypes = {
  price: PropTypes.number.isRequired
}

export default Price;
