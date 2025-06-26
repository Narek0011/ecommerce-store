import {useCart} from '@/store/CartContext';
import styles from '@/styles/sections/Cart.module.scss';
import OrderForm from "@/components/Cart/OrderForm";
import {submitOrder} from "@/services/api";
import {useState} from "react";
import Popup from "@/components/UI/Popup";

const CartModal = ({isOpen, onClose}: { isOpen: boolean; onClose: () => void }) => {
    const {cart,removeFromCart, clearCart} = useCart();
    const [orderStatus, setOrderStatus] = useState<null | 'success' | 'error'>(null);
    const handleOrderSubmit = async (phone: string) => {
        try {
            await submitOrder(phone, cart).then(() => {
                clearCart()
            });
            setOrderStatus('success');
        } catch (error) {
            setOrderStatus('error');
        }
    };

    if (!isOpen) return null;

    const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>Ваша корзина</h3>
                    <button className={styles.closeButton} onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className={styles.modalBody}>
                    {cart.length === 0 ? (
                        <div className={styles.emptyCart}>Корзина пуста</div>
                    ) : (
                        <>
                            <div className={styles.cartItems}>
                                {cart.map((item) => (
                                    <div key={item.id} className={styles.cartItem}>
                                        <div className={styles.itemImage}>
                                            <img src={item.image_url || '/placeholder-product.jpg'} alt={item.title}/>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            <h4>{item.title}</h4>
                                            <div className={styles.itemPrice}>{item.price} ₽ × {item.quantity}</div>
                                        </div>
                                        <button className={styles.closeButton} onClick={() => removeFromCart(item.id)}>
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.cartTotal}>
                                <span>Итого:</span>
                                <span>{totalPrice} ₽</span>
                            </div>
                        </>
                    )}
                </div>
                <OrderForm onSubmit={handleOrderSubmit}/>
            </div>
            <Popup
                isOpen={orderStatus !== null}
                onClose={() => setOrderStatus(null)}
                status={orderStatus}
            />
        </div>
    );
};

export default CartModal;