import React from "react";
import styles from "./nav-list.module.css";

function NavList(props) {
  return (
    <nav>
      <ul className={styles.nav_list}>
        {props.children}
      </ul>
    </nav>
  );
}

export default NavList;
