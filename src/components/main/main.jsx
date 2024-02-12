import React from "react";
import styles from "./main.module.css";
import BurgerConstructor from "../constructor/burger-constructor/burger-construcor";
import BurgerIngredients from "../ingredients/burger-ingredients/burger-ingredients";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function Main({
  openModal,
  setPortalType,
}) {

  const ingredients = useSelector(store => store.ingredients.ingredients);

  return (
    <main className={`${styles.main}`}>
      <DndProvider backend={HTML5Backend}>
        {ingredients.length &&
          <>
            <BurgerIngredients
              data={ingredients}
              openModal={openModal}
              setPortalType={setPortalType}
            />
            <BurgerConstructor
              openModal={openModal}
              setPortalType={setPortalType}
            />
          </>
        }
      </DndProvider>
    </main>
  );
}

Main.propTypes = {
  openModal: PropTypes.func.isRequired,
  setPortalType: PropTypes.func.isRequired,
};

export default Main;
