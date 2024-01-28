import React from "react";
import styles from "./nav-item.module.css";

function NavItem(props) {
  return (
    <li className={`${styles.nav_item} ml-5 mr-5`}>
      {props.children}
    </li>
  );
}

export default NavItem;
