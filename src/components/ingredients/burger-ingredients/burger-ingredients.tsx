import React, { useState, useRef, FC } from "react";
import styles from "./burger-ingredients.module.css";
import IngredientsMenu from "../ingredients-menu/ingredients-menu";
import IngredientsContainer from "../ingredients-container/ingredients-container";
import { BUN, SAUCE, MAIN } from "../../../utils/data";
import { IBurgerIngredients } from "../../../services/types/types";
import { ITitleRefs } from "../../../services/types/types";


const BurgerIngredients: FC<IBurgerIngredients> = ({data}) => {
  const [nearTitle, setNearTitle] = useState(BUN);

  const containerElement = useRef<HTMLDivElement>(null);
  const bunElement = useRef<HTMLHeadingElement>(null);
  const sauceElement = useRef<HTMLHeadingElement>(null);
  const mainElement = useRef<HTMLHeadingElement>(null);



  const titleRefs: ITitleRefs = {
    bunRef: bunElement,
    sauceRef: sauceElement,
    mainRef: mainElement,
  }

  const handleScrolling = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollContainer = (e.target as HTMLElement).scrollTop + (containerElement.current as HTMLElement).offsetTop;
    if (scrollContainer < (sauceElement.current as HTMLElement).offsetTop) {
      if (
        Math.abs(scrollContainer - (bunElement.current as HTMLElement).offsetTop) <
        Math.abs(scrollContainer - (sauceElement.current as HTMLElement).offsetTop)
      ) return setNearTitle(BUN);
      return setNearTitle(SAUCE);
    } else {
      if (
        Math.abs(scrollContainer - (sauceElement.current as HTMLElement).offsetTop) <
        Math.abs(scrollContainer - (mainElement.current as HTMLElement).offsetTop)
      ) return setNearTitle(SAUCE);
      return setNearTitle(MAIN);
    }
  }

  return (
    <div className={`${styles.container}`}>
      <h2 className={`${styles.title} mt-10 mb-5 text text_type_main-large`}>
        Соберите бургер
      </h2>
      <IngredientsMenu nearTitle={nearTitle} refs={titleRefs}/>
      <div
        className={`${styles.sub_container}`}
        onScroll={e => handleScrolling(e)}
        ref={containerElement}
      >
        <IngredientsContainer data={data} refs={titleRefs}
        />
      </div>
    </div>
  );
}

export default BurgerIngredients;
