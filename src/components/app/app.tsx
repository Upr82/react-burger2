import React, { useState, useEffect } from 'react';
import AppHeader from '../header/app-header/app-header';
import Main from '../main/main';
import { getIngredients } from '../../utils/api';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { useModal } from '../../hooks/use-modal';
import { BurgerContext } from '../../services/burger-context';


function App() {
  const [orderNumber, setOrderNumber] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [currIngredient, setCurrIngredient] = useState({
    "_id": "",
    "name": "",
    "type": "",
    "proteins": 0,
    "fat": 0,
    "carbohydrates": 0,
    "calories": 0,
    "price": 0,
    "image": "",
    "image_mobile": "",
    "image_large": "",
    "__v": 0
  });

  const [portalType, setPortalType] = useState('');

  const { visibleModal, openModal, closeModal } = useModal();

  useEffect(() => {
    getIngredients()
      .then(data => {
        setIngredients(data.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <BurgerContext.Provider value={ingredients}>
        <AppHeader />
        <Main
          openModal={openModal}
          setPortalType={setPortalType}
          currIngredient={currIngredient}
          setCurrIngredient={setCurrIngredient}
          setOrderNumber={setOrderNumber}
        />
        {visibleModal && (portalType === 'OrderDetails') &&

          <Modal onClose={closeModal}>
            <OrderDetails orderNumber={orderNumber} />
          </Modal>
        }
        {visibleModal && (portalType === 'IngredientDetails') &&
          currIngredient._id &&
          <Modal onClose={closeModal}>
            <IngredientDetails ingredient={currIngredient} />
          </Modal>
        }
      </BurgerContext.Provider>
    </div>
  );
}

export default App;
