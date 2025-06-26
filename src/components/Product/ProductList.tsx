import React from 'react';
import ProductItem from './ProductItem';
import styles from '../../styles/sections/Product.module.scss';

type ProductListProps = {
  products: any[];
  loadMore: () => void;
  loading: boolean;
  hasMore: boolean;
};

const ProductList: React.FC<ProductListProps> = ({ products, loadMore, loading, hasMore }) => {
  return (
    <div className={styles.productList}>
      {products.map((product, index) => (
        <ProductItem
          key={product.id}
          product={product}
          isLast={index === products.length - 1 && hasMore}
          loadMore={loadMore}
        />
      ))}
      {loading && <div className={styles.loading}>Загрузка...</div>}
    </div>
  );
};

export default ProductList;