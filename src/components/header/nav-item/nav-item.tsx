import React, { FC } from "react";
import styles from "./nav-item.module.css";
import { IParent } from "../../../services/types/types";


const NavItem: FC<IParent> = (props) => {
  return (
    <li className={`${styles.nav_item} ml-5 mr-5`}>
      {props.children}
    </li>
  );
}

export default NavItem;
