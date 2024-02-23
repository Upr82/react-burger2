import React from "react";
import styles from './auth.module.css';
import IngredientDetails from "../components/ingredient-details/ingredient-details";

const IngredientPage = () => {


  return (
    <div className={styles.container}>
      <IngredientDetails />
    </div>
  );
}

export default IngredientPage;
