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
import { NavLink } from "react-router-dom";

function AppHeader() {

  return (

    <header className={styles.header}>
      <NavList className={"mt-4 mb-4"}>
        <div className={styles.nav_container}>
          <NavLink to={'/'} className={`${styles.link}`}>
            {({ isActive }) => (
              <NavItem>
                <BurgerIcon type={isActive ? "primary" : "secondary"} />
                <p className={`ml-2 text text_type_main-default
                  ${isActive ? '' : 'text_color_inactive'}`}
                >
                  Конструктор
                </p>
              </NavItem>
            )}
          </NavLink>

          <NavLink to={'/profile/orders'} className={`${styles.link}`}>
            {({ isActive }) => (
              <NavItem>
                <ListIcon type={isActive ? "primary" : "secondary"} />
                <p className={`ml-2 text text_type_main-default
                  ${isActive ? '' : 'text_color_inactive'}`}
                >
                  Лента заказов
                </p>
              </NavItem>
            )}
          </NavLink>
        </div>

        <NavLink to={`/`} className={`${styles.logo_link}`}>
          <Logo />
        </NavLink>

        <NavLink end to={'/profile'} className={`${styles.link}`}>
          {({ isActive }) => (
            <NavItem>
              <ProfileIcon type={isActive ? "primary" : "secondary"} />
              <p className={`ml-2 text text_type_main-default
                ${isActive ? '' : 'text_color_inactive'}`}
              >
                Личный кабинет
              </p>
            </NavItem>
          )}
        </NavLink>

      </NavList>
    </header>
  );
}

export default AppHeader;
