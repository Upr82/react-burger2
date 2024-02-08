import { useState, useCallback } from "react";

export const useModal = () => {
  const [visibleModal, setVisibleModal] = useState(false);

  const openModal = useCallback(() => {
    setVisibleModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisibleModal(false);
  }, []);

  return {
    visibleModal,
    openModal,
    closeModal,
  };
};
