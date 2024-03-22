import React, { useEffect } from "react";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
// import { useDispatch } from "react-redux";
// import { CURR_INGREDIENT_DEL } from "../../services/actions/curr-ingredient-actions";
import { IModal } from "../../services/types/types";

function Modal ({ onClose, children }: IModal) {

  const portalDiv = document.getElementById("modal") as Element;
  // const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
  }

  function closeByEsc(e: KeyboardEvent) {
    if(e.key === "Escape") {
      handleClose();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closeByEsc);
    return (() => document.removeEventListener('keydown', closeByEsc));
    // eslint-disable-next-line
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

export default Modal;
