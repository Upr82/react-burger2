import React from "react";
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ children, handleCloseModal }) {

  const closeByClickOnlyOverlay = (e) => {
    if (e.target.classList.contains(styles.overlay)) {
      handleCloseModal();
    }
  }

  return (
    <div
      className={`${styles.overlay}`}
      onClick={closeByClickOnlyOverlay}
    >
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  handleCloseModal: PropTypes.func
}

export default ModalOverlay;
