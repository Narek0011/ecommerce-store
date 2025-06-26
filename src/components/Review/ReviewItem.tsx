import React from 'react';
import sanitizeHtml from 'sanitize-html';
import styles from '../../styles/sections/Review.module.scss';

type ReviewItemProps = {
  review: {
    id: number;
    text: string;
  };
};

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const cleanHtml = sanitizeHtml(review.text, {
    allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    allowedAttributes: {}
  });

  return (
    <div className={styles.reviewItem}>
      <div
        className={styles.reviewContent}
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    </div>
  );
};

export default ReviewItem;