import React, { useState, useEffect } from 'react';
import AppHeader from '../header/app-header/app-header';
import Main from '../main/main';
import { getIngredients } from '../../utils/api';
import { TEST_BUN, TEST_FILLINGS, ORDER_ID } from '../../utils/data';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { useModal } from '../../hooks/use-modal';


function App() {
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

  // const resetCurrIngredient = () => {
  //   setCurrIngredient({
  //     ...currIngredient,
  //     "_id": "",
  //     "name": "",
  //     "type": "",
  //     "proteins": 0,
  //     "fat": 0,
  //     "carbohydrates": 0,
  //     "calories": 0,
  //     "price": 0,
  //     "image": "",
  //     "image_mobile": "",
  //     "image_large": "",
  //     "__v": 0
  //   });
  // }

  useEffect(() => {
    getIngredients()
      .then(data => {
        setIngredients(data.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <AppHeader />
      <Main
        ingredients={ingredients}
        currBun={TEST_BUN}
        currFillings={TEST_FILLINGS}
        openModal={openModal}
        setPortalType={setPortalType}
        currIngredient={currIngredient}
        setCurrIngredient={setCurrIngredient}
      />
      {visibleModal && (portalType === 'OrderDetails') &&

        <Modal onClose={closeModal}>
          <OrderDetails order={ORDER_ID} />
        </Modal>
      }
      {visibleModal && (portalType === 'IngredientDetails') &&
        currIngredient._id &&
        <Modal onClose={closeModal}>
          <IngredientDetails ingredient={currIngredient} />
        </Modal>
      }
    </div>
  );
}

export default App;
