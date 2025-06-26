import React from 'react';
import { useCart } from '@/store/CartContext';
import styles from '../../styles/sections/Cart.module.scss';

const CartSummary: React.FC = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  return (
    <div className={styles.cartSummary}>
      <h3>Ваша корзина</h3>
      <div className={styles.summaryRow}>
        <span>Товаров:</span>
        <span>{totalItems}</span>
      </div>
      <div className={styles.summaryRow}>
        <span>Сумма:</span>
        <span>{totalPrice} ₽</span>
      </div>
    </div>
  );
};

export default CartSummary;