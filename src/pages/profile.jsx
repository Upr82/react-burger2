import React from "react";
import styles from './auth.module.css';
import { useDispatch } from "react-redux";
import { POST_LOGOUT } from "../services/actions/user";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { postLogout } from "../utils/api";
import { getCookie, deleteAllCookies } from "../utils/cookie";


function Profile() {

  const dispatch = useDispatch();

  const activeLink = `text text_type_main-medium pt-4 pb-4`;
  const inactiveLink = `text text_type_main-medium text_color_inactive pt-4 pb-4`;

  const navigate = useNavigate();

  const onLogout = () => {
    postLogout(getCookie('refreshToken'));
    deleteAllCookies();
    dispatch({type: POST_LOGOUT});
    navigate('/', {replace: true});
  }

  return (
    <div className={`${styles.profile_container}`}>
      <div className={styles.nav_container}>
        <nav className={`${styles.nav_menu}`}>
          <NavLink end to='/profile' className={styles.nav_link}>
            {({ isActive }) =>
              <p className={isActive ? activeLink : inactiveLink}>
                Профиль
              </p>
            }
          </NavLink>
          <NavLink to='orders' className={styles.nav_link}>
            {({ isActive }) =>
              <p className={isActive ? activeLink : inactiveLink}>
                История заказов
              </p>
            }
          </NavLink>
          <p
            className={`${inactiveLink} ${styles.nav_button}`}
          onClick={onLogout}
          >Выход</p>
        </nav>
        <p className={
          `text text_type_main-small mt-20 text_color_inactive`
        }>
          В этом разделе вы можете изменить свои данные
        </p>
      </div>
      <Outlet />
    </div>
  );
}

export default Profile;
