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


function App() {

  const dispatch = useDispatch();
  const portalType = useSelector(state => state.portal.portalType);
  const ingredients = useSelector(store => store.ingredients.ingredients);

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleCloseModalWithBG = () => {
    dispatch({type: RESET_PORTAL});
    navigate(-1);
  }

  const handleCloseModal = () => {
    dispatch({type: RESET_PORTAL});
  }

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className="page">
      <AppHeader />
      <Routes>
        <Route path='/' element={
          <Main />
        } />
        <Route path='/login' element={
          <LoggedClose element={
            <Login />
          } />
        } />
        <Route path='/register' element={
          <LoggedClose element={
            <Register />
          } />
        } />
        <Route path='/forgot-password' element={
          <LoggedClose element={
            <ForgotPassword />
          } />
        } />
        <Route path='/reset-password' element={
          <LoggedClose element={
            <ResetPassword />
          } />
        } />

        {ingredients?.length &&
          <Route path='/ingredients/:id' element={
            <IngredientPage />
          } />
        }

        <Route path='/profile' element={<ProtectedRouteElement element={<Profile />} />}>
          <Route path='/profile' element={<EditProfile />} />
          <Route path='/profile/orders' element={<OrdersList />} />
        </Route>

        <Route path='/profile/orders/:number' element={<ProtectedRouteElement element={<Order />} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>


      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal onClose={handleCloseModalWithBG}>
                <IngredientDetails />
              </Modal>
            }
          />
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
