import Link from 'next/link';
import { useCart } from '@/store/CartContext';
import styles from '../../styles/sections/Layout.module.scss';
import { useState } from 'react';
import CartModal from '../UI/CartModal';

const Header = () => {
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
      <>
        <header className={styles.header}>
          <div className="container">
            <div className={styles.headerContent}>
              <Link href="/" className={styles.logo}>
                Интернет-магазин
              </Link>
              <button
                  className={styles.cartIndicator}
                  onClick={() => setIsCartOpen(true)}
              >
                Корзина ({totalItems})
              </button>
            </div>
          </div>
        </header>
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </>
  );
};

export default Header;