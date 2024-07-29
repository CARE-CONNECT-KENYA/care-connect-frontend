'use client';
import React, { useState } from 'react';
import styles from '../Styles/Singleprovider.module.css';

const ReviewForm: React.FC<{ providerID: number; userID: number }> = ({ providerID, userID }) => {
  const [rating, setRating] = useState<number>(0);
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/care/newreview/${providerID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ rating, text, userID, providerID }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add review: ${errorText}`);
      }

      setSuccess('Review added successfully');
      setRating(0);
      setText('');
    } catch (error) {
      console.error('Error adding review:', error);
      setError((error as Error).message);
    }
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`${styles.star} ${rating > index ? styles.filled : ''}`}
        onClick={() => setRating(index + 1)}
      >
        ★
      </span>
    ));
  };

  return (
    <div className={styles.reviewFormContainer}>
      <h2>Add a Review</h2>
      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <div className={styles.formGroup}>
        
          <div className={styles.starContainer}>{renderStars()}</div>
        </div>
        <div className={styles.formGroup}>
          
          <textarea
            id="text"
            placeholder='write a review'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.submitButton}>Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
