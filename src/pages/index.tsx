import {useEffect, useState} from 'react';
import Head from 'next/head';
import { useCart } from '../store/CartContext';
import ProductList from '../components/Product/ProductList';
import ReviewList from '../components/Review/ReviewList';
import CartSummary from '../components/Cart/CartSummary';
import OrderForm from '../components/Cart/OrderForm';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Popup from '../components/UI/Popup';
import styles from '../styles/sections/Layout.module.scss';
import {getProducts, getReviews, submitOrder} from "@/services/api";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newProducts = await getProducts(page, 20);
      console.log('newProducts', newProducts)
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts(prev => [...prev, ...newProducts?.items]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      loadMore()
      const reviewsData  = await getReviews()
      setReviews(reviewsData)
      console.log('reviewsData:::: ', reviewsData)
    })()
  }, []);

  return (
    <div className={styles.layout}>
      <Head>
        <title>Интернет-магазин</title>
        <meta name="description" content="Тестовое задание для React Developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1>Добро пожаловать в наш магазин</h1>
            <p>Лучшие товары по доступным ценам</p>
          </div>
        </section>

        <section className={`section`}>
          <div className="container">
            <h2 className="section-title">Отзывы</h2>
            <ReviewList reviews={reviews}/>
          </div>
        </section>

        <section className={`section`}>
          <div className="container">
            <h2 className="section-title">Наши товары</h2>
            <ProductList products={products} hasMore={hasMore} loadMore={loadMore} loading={loading}/>
          </div>
        </section>
      </main>

      <Footer/>
    </div>
  );
}