'use client';
import React from 'react';
import styles from '../Styles/Singleprovider.module.css';

type RatingProgressBarProps = {
  ratings: number[];
};

const RatingProgressBar: React.FC<RatingProgressBarProps> = ({ ratings }) => {
  const totalRatings = ratings.length;
  const ratingCounts = [0, 0, 0, 0, 0];

  // Count the occurrences of each rating
  ratings.forEach((rating) => {
    if (rating >= 1 && rating <= 5) {
      ratingCounts[rating - 1]++;
    }
  });

  const maxCount = Math.max(...ratingCounts);
  const averageRating = (ratings.reduce((sum, rating) => sum + rating, 0) / totalRatings).toFixed(1);

  return (
    <div className={styles.ratingContainer}>
     
    
     <div className={styles.ratingbars}>
            {ratingCounts.map((count, index) => (
                <div key={index} >
                    <div className={styles.ratingRow}> 
                        <span className={styles.ratingNumber}>{5 - index}</span>
                        <div
                            className={`${styles.progressBar} ${count === 0 ? styles.emptyBar : ''}`}
                            style={{ width: `${(count / maxCount) * 100}%` }}
                            >
                        {count}
                        </div>
                    </div>
                </div>
            ))}

     </div>
      
       <div className={styles.avrgrating}>
            <div>
                
                <h2>{averageRating}</h2>
                <p>Avrage rating</p>
                
            </div>
      </div>
    </div>
  );
};

export default RatingProgressBar;
