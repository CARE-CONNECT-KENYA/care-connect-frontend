'use client';
import React, { useEffect, useState } from 'react';
import styles from '../Styles/Singleprovider.module.css';
import RatingProgressBar from './RatingProgressBarProps';

type Review = {
  id: number;
  rating: number;
  text: string;
  providerID: number;
  user: string;
};

const ProviderReviews: React.FC<{ providerID: number }> = ({ providerID }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;

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

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? styles.filledStar : styles.emptyStar}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const ratings = reviews.map((review) => review.rating);

  return (
    <div className={styles.reviewsContainer}>
      <h2>Provider Reviews</h2>
      <RatingProgressBar ratings={ratings} />
      {currentReviews.length > 0 ? (
        currentReviews.map((review) => (
          <div key={review.id} className={styles.review}>
            <div className={styles.nameOfreviewer}>
              <div className={styles.userIcon}>
                {review.user.charAt(0).toUpperCase()}
              </div>
              <p>{review.user}</p>
            </div>
            <p>{renderStars(review.rating)}</p>
            <p>{review.text}</p>
          </div>
        ))
      ) : (
        <p>No reviews available for this provider.</p>
      )}
      <div className={styles.pagination}>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={styles.pageButton}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProviderReviews;
