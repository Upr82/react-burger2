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
import RedirectRoute from '../redirect-route/redirect-route';
import NotFound from '../../pages/not-found';
import ApiResult from '../api-result/api-result';
import OrdersList from '../orders-list/orders-list';
import EditProfile from '../edit-profile/edit-profile';
import Order from '../../pages/order';
import IngredientPage from '../../pages/ingredient-page';
import { RESET_PORTAL } from '../../services/actions/portal';
import { getCookie } from '../../utils/cookie';
import { IIngredient } from '../../services/types/types';
import { CURR_INGREDIENT_DEL } from '../../services/actions/curr-ingredient-actions';
import { getUserThunk } from '../../services/actions/user';


function App() {

  const dispatch = useDispatch();
  const getPortalType = (state: any) => state.portal.portalType;

  type TPotalType = 'OrderDetails' | 'ApiResult' | '';
  const portalType: TPotalType = useSelector(getPortalType);

  const getCurrIngredient = (state: any) => state.currIngredient.description;
  const currIngredient: IIngredient = useSelector(getCurrIngredient);

  const getFromStoreIngredients = (store: any) => store.ingredients.ingredients;
  const ingredients: IIngredient[] = useSelector(getFromStoreIngredients);

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  let accessToken = getCookie('accessToken') || '';
  let refreshToken = getCookie('refreshToken') || '';

  const handleCloseModalWithBG = () => {
    dispatch({ type: RESET_PORTAL });

    if (currIngredient) {
      dispatch({ type: CURR_INGREDIENT_DEL });
    }
    navigate(-1);
  }

  const handleCloseModal = () => {
    dispatch({ type: RESET_PORTAL });

    if (currIngredient) {
      dispatch({ type: CURR_INGREDIENT_DEL });
    }
  }

  useEffect(() => {
    // @ts-ignore
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (accessToken && refreshToken) {

      // @ts-ignore
      dispatch(getUserThunk(accessToken, refreshToken));
    }
    // eslint-disable-next-line
  }, []);

  const RouteMain = <Route path='/' element={
    <Main />
  } />

  const RouteLogin = <Route path='/login' element={
    <RedirectRoute element={
      <Login />
    } />
  } />

  const RouteRegister = <Route path='/register' element={
    <RedirectRoute element={
      <Register />
    } />
  } />

  const RouteForgotPassword = <Route path='/forgot-password' element={
    <RedirectRoute element={
      <ForgotPassword />
    } />
  } />

  const RouteResetPassword = <Route path='/reset-password' element={
    <RedirectRoute element={
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
