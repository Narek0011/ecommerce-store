import React, { useState } from 'react';
import InputMask from '@mona-health/react-input-mask';
import { useCart } from '@/store/CartContext';
import styles from '../../styles/sections/Review.module.scss';

type OrderFormProps = {
  onSubmit: (phone: string) => Promise<void>;
};

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit }) => {
  const { phone, setPhone, cart } = useCart();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      setError('Добавьте товары в корзину');
      return;
    }

    const cleanedPhone = phone.replace(/\D/g, '');
    if (cleanedPhone.length !== 11) {
      setError('Введите полный номер телефона');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      await onSubmit(cleanedPhone);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.orderForm}>
      <div className={styles.formGroup}>
        <label htmlFor="phone">Телефон</label>
        <InputMask
            id="phone"
            mask="+7 (999) 999-99-99"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.phoneInput}
        />
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting || cart.length === 0}
        className={styles.submitButton}
      >
        {isSubmitting ? 'Отправка...' : 'Заказать'}
      </button>
    </form>
  );
};

export default OrderForm;