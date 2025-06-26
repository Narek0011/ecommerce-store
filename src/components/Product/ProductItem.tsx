import React, { useState } from 'react';
import { useCart } from '@/store/CartContext';
import styles from '../../styles/sections/Product.module.scss';

type ProductItemProps = {
  product: any;
  isLast: boolean;
  loadMore: () => void;
};

const ProductItem: React.FC<ProductItemProps> = ({ product, isLast, loadMore }) => {
  const { addToCart, updateQuantity, cart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const itemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const cartItem = cart.find(item => item.id === product.id);
    setIsInCart(!!cartItem);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cart, product.id]);

  React.useEffect(() => {
    if (!isLast || !itemRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [isLast, loadMore]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url,
    });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
      updateQuantity(product.id, value);
    }
  };

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(product.id, newQuantity);
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className={styles.productItem} ref={isLast ? itemRef : null}>
      <div className={styles.imageContainer}>
        <img
          src={product.image_url || '/placeholder-product.jpg'}
          alt={product.title}
          loading="lazy"
        />
      </div>
      <div className={styles.productInfo}>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <div className={styles.price}>{product.price} ₽</div>

        {!isInCart ? (
          <button
            className={styles.buyButton}
            onClick={handleAddToCart}
          >
            Купить
          </button>
        ) : (
          <div className={styles.quantityControls}>
            <button onClick={decrement}>-</button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
            <button onClick={increment}>+</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;