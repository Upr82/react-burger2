import React, { FC } from "react";
import styles from "./nav-list.module.css";
import { IParent } from "../../../services/types/types";

const NavList: FC<IParent> = (props) => {
  return (
    <nav>
      <ul className={styles.nav_list}>
        {props.children}
      </ul>
    </nav>
  );
}

export default NavList;
