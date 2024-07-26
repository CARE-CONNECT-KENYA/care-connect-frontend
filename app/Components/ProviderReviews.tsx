'use client';
import React, { useEffect, useState } from 'react';
import styles from '../Styles/Singleprovider.module.css';
import RatingProgressBar from './RatingProgressBarProps';

type Review = {
  id: number;
  rating: number;
  text: string;
  providerID: number;
};

const ProviderReviews: React.FC<{ providerID: number }> = ({ providerID }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/care/reviews/${providerID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch reviews: ${errorText}`);
        }

        const data = await response.json();
        setReviews(data.reviews); // Using the static "reviews" key
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [providerID]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const ratings = reviews.map((review) => review.rating);

    

  return (
    <div className={styles.reviewsContainer}>
      <h2>Provider Reviews</h2>
       <RatingProgressBar  ratings={ratings} />
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className={styles.review}>
            <p><strong>Rating:</strong> {review.rating}</p>
            <p><strong>Review:</strong> {review.text}</p>

          </div>
        ))
      ) : (
        <p>No reviews available for this provider.</p>
      )}
    </div>
  );
};

export default ProviderReviews;
