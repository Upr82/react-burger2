import React from "react";
import NavList from "../nav-list/nav-list";
import NavItem from "../nav-item/nav-item";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

function AppHeader() {

  return (
    <header className={styles.header}>
      <NavList className={"mt-4 mb-4"}>
        <div className={styles.nav_container}>
          <NavItem>
            <BurgerIcon type="primary"/>
            <p className={`ml-2 text text_type_main-default`}>
              Конструктор
            </p>
          </NavItem>
          <NavItem>
            <ListIcon type="primary" />
            <p className={`ml-2 text text_type_main-default`}>
              Лента заказов
            </p>
          </NavItem>
        </div>
        <a href="/" className={`${styles.logo_link}`}>
          <Logo />
        </a>
        <NavItem>
          <ProfileIcon type="primary" />
          <p className={`ml-2 text text_type_main-default`}>
            Личный кабинет
          </p>
        </NavItem>
      </NavList>
    </header>
  );
}

export default AppHeader;
