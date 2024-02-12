import React from "react";
import styles from "./ingredients-menu.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BUN, SAUCE, MAIN } from "../../../utils/data";
import PropTypes from 'prop-types';


const IgredientsMenu = React.forwardRef(({nearTitle}, ref) => {

  const { bunRef, sauceRef, mainRef } = ref;

  const scroll = (anch) => {
    switch (anch) {
      case BUN: {
        return bunRef.current.scrollIntoView({ behavior: "smooth" });
      }
      case SAUCE: {
        return sauceRef.current.scrollIntoView({ behavior: "smooth" });
      }
      case MAIN: {
        return mainRef.current.scrollIntoView({ behavior: "smooth" });
      }
      default: {
        return;
      }
    }
  }

  return (
    <>
      <nav className={`${styles.list} mb-10`}>
        <Tab value="bun" active={nearTitle === BUN} onClick={() => scroll(BUN)}>
          Булки
        </Tab>
        <Tab value="sauce" active={nearTitle === SAUCE} onClick={() => scroll(SAUCE)}>
          Соусы
        </Tab>
        <Tab value="main" active={nearTitle === MAIN} onClick={() => scroll(MAIN)}>
          Начинки
        </Tab>
      </nav>
    </>
  );
})

IgredientsMenu.propTypes = {
  nearTitle: PropTypes.string.isRequired,
}

export default IgredientsMenu;
