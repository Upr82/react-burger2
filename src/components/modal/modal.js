import React, { useEffect } from "react";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";


function Modal({ children, onClose }) {

  const portalDiv = document.getElementById("modal");

  const closeHandler = () => {
    onClose();
  }

  function closeByEsc(e) {
    if(e.key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closeByEsc);
    return (() => document.removeEventListener('keydown', closeByEsc));
  }, []);

  return createPortal((
    <ModalOverlay handleCloseModal={closeHandler}>
      <div className={`${styles.container} pt-10 pr-10 pl-10 pb-15`} id="modal-container">
        <button
          className={`${styles.button}`}
          onClick={closeHandler}
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
