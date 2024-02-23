import React, { useEffect } from "react";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { CURR_INGREDIENT_DEL } from "../../services/actions/curr-ingredient-actions";


function Modal({ onClose, children }) {

  const portalDiv = document.getElementById("modal");
  const dispatch = useDispatch();

  const handleClose = () => {

    dispatch({type: CURR_INGREDIENT_DEL});
    onClose();
  }

  function closeByEsc(e) {
    if(e.key === "Escape") {
      handleClose();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closeByEsc);
    return (() => document.removeEventListener('keydown', closeByEsc));
  }, []);

  return createPortal((
    <ModalOverlay handleCloseModal={handleClose}>
      <div className={`${styles.container} pt-10 pr-10 pl-10 pb-15`} id="modal-container">
        <button
          className={`${styles.button}`}
          onClick={handleClose}
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>
  ), portalDiv
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Modal;
