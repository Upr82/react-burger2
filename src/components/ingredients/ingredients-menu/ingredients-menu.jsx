import React from "react";
import styles from "./ingredients-menu.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function IgredientsMenu() {
  const [current, setCurrent] = React.useState('bun');

  const scroll = (anch) => {
    setCurrent(anch);
    document.getElementById(anch).scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <nav className={`${styles.list} mb-10`}>
        <Tab value="bun" active={current === 'bun'} onClick={() => scroll('bun')}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={() => scroll('sauce')}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={() => scroll('main')}>
          Начинки
        </Tab>
      </nav>
    </>
  );
}

export default IgredientsMenu;
