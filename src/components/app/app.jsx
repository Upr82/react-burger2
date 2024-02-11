import React, { useState, useEffect } from 'react';
import AppHeader from '../header/app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { useModal } from '../../hooks/use-modal';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients-actions';
import { CURR_INGREDIENT_DEL } from '../../services/actions/curr-ingredient-actions';


function App() {

  const dispatch = useDispatch();

  const [portalType, setPortalType] = useState('');

  const { visibleModal, openModal, closeModal } = useModal();

  const closeIngredientModal = () => {
    closeModal();
    dispatch({
      type: CURR_INGREDIENT_DEL
    });
  }

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className="page">
      <AppHeader />
      <Main
        openModal={openModal}
        setPortalType={setPortalType}
      />

      {visibleModal && (portalType === 'OrderDetails') &&
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      }
      {visibleModal && (portalType === 'IngredientDetails') &&
        <Modal onClose={closeIngredientModal}>
          <IngredientDetails />
        </Modal>
      }

    </div>
  );
}

export default App;
