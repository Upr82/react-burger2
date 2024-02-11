import React from "react";
import styles from "./ingredients-menu.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BUN, SAUCE, MAIN } from "../../../utils/data";

function IgredientsMenu({nearTitle}) {

  const scroll = (anch) => {
    document.getElementById(anch).scrollIntoView({ behavior: "smooth" });
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
}

export default IgredientsMenu;
