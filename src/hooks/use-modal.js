import React, { useState, useCallback } from "react";

// кастомные хуки всегда должны начинаться с глагола `use`, чтобы реакт понял, что это хук. Он следит за их вызовами
export const useModal = () => {
  const [visibleModal, setVisibleModal] = useState(false);

  // `useCallback` нужен для того, чтобы зафиксировать ссылку на функцию. Таким образом уменьшится кол-во перерисовок компонента, куда будет передана эта функция
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
