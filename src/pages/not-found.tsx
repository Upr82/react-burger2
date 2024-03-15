import React, { FC } from "react";
import styles from './auth.module.css';
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <div className={styles.n_f_container}>
      <h1 className={`${styles.n_f_title} text text_type_main-large`}>
        Ошибка 404
      </h1>
      <p className='mt-3 text text_type_main-medium'>
        Такой страницы нет или она устарела
      </p>
      <Link
        to='/'
        className={`${styles.n_f_link}`}
      >
        <p className={`mt-3 text text_type_main-medium text_color_inactive`}
        >
          на главную страницу
        </p>
      </Link>
    </div>
  )
}

export default NotFound;
