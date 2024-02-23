import React from "react";
import styles from "./main.module.css";
import BurgerConstructor from "../constructor/burger-constructor/burger-construcor";
import BurgerIngredients from "../ingredients/burger-ingredients/burger-ingredients";
import { useSelector } from "react-redux";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function Main() {

  const ingredients = useSelector(store => store.ingredients.ingredients);

  return (
    <main className={`${styles.main}`}>
      <DndProvider backend={HTML5Backend}>
        {ingredients.length &&
          <>
            <BurgerIngredients
              data={ingredients}
            />
            <BurgerConstructor />
          </>
        }
      </DndProvider>
    </main>
  );
}

export default Main;
