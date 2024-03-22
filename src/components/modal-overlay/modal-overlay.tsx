import React from "react";
import styles from './modal-overlay.module.css';
import { IModalOverlay } from "../../services/types/types";


function ModalOverlay({ children, handleCloseModal }: IModalOverlay) {

  const closeByClickOnlyOverlay = (e: React.MouseEvent) => {
    const el = e.target as HTMLDivElement;
    if (el.classList.contains(styles.overlay)) {
      handleCloseModal();
    }
  }

  return (
    <div
      className={`${styles.overlay}`}
      onClick={(e) => closeByClickOnlyOverlay(e)}
    >
      {children}
    </div>
  );
}

export default ModalOverlay;
