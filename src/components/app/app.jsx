import React, { useEffect } from 'react';
import AppHeader from '../header/app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients-actions';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Login from '../../pages/login';
import Profile from '../../pages/profile';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import ProtectedRouteElement from '../protected-route/protected-route';
import LoggedClose from '../logged-close/logged-close';
import NotFound from '../../pages/not-found';
import ApiResult from '../api-result/api-result';
import OrdersList from '../orders-list/orders-list';
import EditProfile from '../edit-profile/edit-profile';
import Order from '../../pages/order';
import IngredientPage from '../../pages/ingredient-page';
import { RESET_PORTAL } from '../../services/actions/portal';
import { getCookie } from '../../utils/cookie';
import { getUser } from '../../utils/api';
import { POST_LOGIN_SUCCESS } from '../../services/actions/user';



function App() {

  const dispatch = useDispatch();
  const getPortalType = state => state.portal.portalType;
  const portalType = useSelector(getPortalType);

  const getFromStoreIngredients = store => store.ingredients.ingredients;
  const ingredients = useSelector(getFromStoreIngredients);

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  let accessToken = getCookie('accessToken') || '';
  let refreshToken = getCookie('refreshToken') || '';

  const handleCloseModalWithBG = () => {
    dispatch({ type: RESET_PORTAL });
    navigate(-1);
  }

  const handleCloseModal = () => {
    dispatch({ type: RESET_PORTAL });
  }

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (accessToken && refreshToken) {
      getUser(getCookie('accessToken'), getCookie('refreshToken'))
        .then(data => {
          dispatch({
            type: POST_LOGIN_SUCCESS,
            name: data.user.name,
            email: data.user.email
          });
        })
        .catch(Error);
    }
  }, []);

  const RouteMain = <Route path='/' element={
    <Main />
  } />

  const RouteLogin = <Route path='/login' element={
    <LoggedClose element={
      <Login />
    } />
  } />

  const RouteRegister = <Route path='/register' element={
    <LoggedClose element={
      <Register />
    } />
  } />

  const RouteForgotPassword = <Route path='/forgot-password' element={
    <LoggedClose element={
      <ForgotPassword />
    } />
  } />

  const RouteResetPassword = <Route path='/reset-password' element={
    <LoggedClose element={
      <ResetPassword />
    } />
  } />

  const RouteIngredientsId = <Route path='/ingredients/:id' element={
    <IngredientPage />
  } />

  const RouteEditProfile = <Route path='/profile' element={<EditProfile />} />
  const RouteOrdersList = <Route path='/profile/orders' element={<OrdersList />} />

  const RouteOrdersNumber = <Route path='/profile/orders/:number'
    element={<ProtectedRouteElement element={<Order />} />} />

  const RouteNotFound = <Route path='*' element={<NotFound />} />

  const RouteModalIngredient = <Route
    path='/ingredients/:id'
    element={
      <Modal onClose={handleCloseModalWithBG}>
        <IngredientDetails />
      </Modal>
    }
  />

  return (
    <div className="page">
      <AppHeader />
      <Routes location={background || location}>
        {RouteMain}
        {RouteLogin}
        {RouteRegister}
        {RouteForgotPassword}
        {RouteResetPassword}

        {ingredients?.length && RouteIngredientsId}

        <Route path='/profile' element={<ProtectedRouteElement element={<Profile />} />}>
          {RouteEditProfile}
          {RouteOrdersList}
        </Route>

        {RouteOrdersNumber}
        {RouteNotFound}
      </Routes>


      {background && (
        <Routes>
          {RouteModalIngredient}
        </Routes>
      )}

      {(portalType === 'OrderDetails') &&
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      }
      {(portalType === 'ApiResult') &&
        <Modal onClose={handleCloseModal}>
          <ApiResult />
        </Modal>
      }
    </div>
  );
}

export default App;
