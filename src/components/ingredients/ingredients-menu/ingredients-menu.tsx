import React from "react";
import styles from "./ingredients-menu.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BUN, SAUCE, MAIN } from "../../../utils/data";
import { ITitleRefs } from "../../../services/types/types";

type TIngredientsMenu = {
  nearTitle: string,
  refs: ITitleRefs
}

type TAnch = 'bun'| 'sauce'| 'main';


const IgredientsMenu = (({nearTitle, refs}: TIngredientsMenu) => {

  const { bunRef, sauceRef, mainRef } = refs;

  const scroll = (anch: TAnch) => {
    switch (anch) {
      case BUN: {
        if (bunRef.current) {
          return bunRef.current.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }
      case SAUCE: {
        if (sauceRef.current) {
          return sauceRef.current.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }
      case MAIN: {
        if (mainRef.current) {
          return mainRef.current.scrollIntoView({ behavior: "smooth" });
        }
        return;
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

export default IgredientsMenu;
