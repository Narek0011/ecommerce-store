import React from 'react';
import { sanitizeReviewHtml } from '@/utils/sanitizeHtml';
import styles from '../../styles/sections/Review.module.scss';

type Review = {
  id: number;
  text: string;
};

type ReviewItemProps = {
  review: Review;
};

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const cleanHtml = sanitizeReviewHtml(review.text);

  return (
      <div className={styles.reviewItem}>
        <div
            className={styles.reviewContent}
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
      </div>
  );
};

type ReviewListProps = {
  reviews: Review[];
  loading?: boolean;
  error?: string | null;
};

const ReviewList: React.FC<ReviewListProps> = ({ reviews, loading = false, error = null }) => {
  if (loading) {
    return (
        <div className={styles.reviewList}>
          <div className={styles.loading}>Loading reviews...</div>
        </div>
    );
  }

  if (error) {
    return (
        <div className={styles.reviewList}>
          <div className={styles.error}>Failed to load reviews: {error}</div>
        </div>
    );
  }

  if (reviews.length === 0) {
    return (
        <div className={styles.reviewList}>
          <div className={styles.empty}>No reviews available</div>
        </div>
    );
  }

  return (
      <div className={styles.reviewList}>
        {reviews.map(review => (
            <ReviewItem key={review.id} review={review} />
        ))}
      </div>
  );
};

export default ReviewList;