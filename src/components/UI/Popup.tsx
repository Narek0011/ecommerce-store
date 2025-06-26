import React from 'react';
import styles from '../../styles/sections/Popup.module.scss';

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  status: 'success' | 'error' | null;
};

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, status }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        {status === 'success' ? (
          <>
            <h3>Заказ успешно оформлен!</h3>
            <p>Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время.</p>
          </>
        ) : (
          <>
            <h3>Ошибка при оформлении заказа</h3>
            <p>Пожалуйста, попробуйте еще раз или свяжитесь с поддержкой.</p>
          </>
        )}
        <button onClick={onClose} className={styles.closeButton}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default Popup;