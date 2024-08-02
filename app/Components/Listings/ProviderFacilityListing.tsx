'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../Styles/ProviderCard.module.css';

type Facility = {
  bio: string;
  reg_date: string;
  email: string;
  location: string;
  phoneNumber: string;
  id: number;
  name: string;
  services: string[];
  providerType: string;
  profileImage: string;
  rating: number | null;
};

const ITEMS_PER_PAGE = 9;

function ProviderFacilityListing() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchFacilities = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        console.error('No access token found');
        return;
      }

      try {
        const response = await fetch('care/provider/facility', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch facilities');
        }

        const data = await response.json();
        setFacilities(data.Facilities); // Ensure the key matches the response from the endpoint
      } catch (error) {
        console.error('Error fetching facilities:', error);
      }
    };

    fetchFacilities();
  }, []);

  const renderStars = (rating: number | null) => {
    if (rating === null) {
      return <p>No rating</p>;
    }

    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? styles.filledStar : styles.emptyStar}>
          ★
        </span>
      );
    }
    return stars;
  };

  const handleKnowMoreClick = (id: number) => {
    router.push(`/provider/${id}`);
  };

  const truncateBio = (bio: string) => {
    const maxLength = 150;
    if (bio.length > maxLength) {
      return bio.slice(0, maxLength) + '...';
    }
    return bio;
  };

  const indexOfLastFacility = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstFacility = indexOfLastFacility - ITEMS_PER_PAGE;
  const currentFacilities = facilities.slice(indexOfFirstFacility, indexOfLastFacility);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div>
        {currentFacilities.map((facility) => (
          <div key={facility.id} className={styles.CardContainer}>
            <div>
              {/* Image and provider tag */}
              <img src={facility.profileImage} alt={facility.name} />
              <h4>{facility.providerType}</h4>
            </div>
            <div className={styles.contentArea}>
              {/* Facility details */}
              <h1>{facility.name}</h1>
              <div className={styles.stars}>{renderStars(facility.rating)}</div>
              <p><span>Services:</span> {facility.services.join(' | ')}</p>
              <p>{truncateBio(facility.bio)}</p>
              <div className={styles.callToAction}>
                <button type='button' onClick={() => handleKnowMoreClick(facility.id)}>Know More</button>
              </div>
            </div>
          </div>
        ))}
        <div className={styles.pagination}>
          {Array.from({ length: Math.ceil(facilities.length / ITEMS_PER_PAGE) }, (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)} className={index + 1 === currentPage ? styles.active : ''}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProviderFacilityListing;
