'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../Styles/ProviderCard.module.css';

type Provider = {
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
  rating: number;
};

const ITEMS_PER_PAGE = 9;

function ProvidersCard() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        console.error('No access token found');
        return;
      }

      try {
        const response = await fetch('care/providers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch providers');
        }

        const data = await response.json();
        setProviders(data.providerlist); // Assuming `providerlist` is always present
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchProviders();
  }, []);

  const renderStars = (rating: number | null) =>{
    if (rating === null ){
      return <p>No rating</p>    }
      
      const stars = [];
      for (let i = 0; i<5; i++){
        stars.push(
          <span key={i} className={i < rating ? styles.filleStar : styles.emptyStar}>
            ★
          </span>
        )

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

  const indexOfLastProvider = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProvider = indexOfLastProvider - ITEMS_PER_PAGE;
  const currentProviders = providers.slice(indexOfFirstProvider, indexOfLastProvider);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
    <div>
      {currentProviders.map((provider, id) => (
        <div key={provider.id} className={styles.CardContainer}>
          <div>
            {/* Image and provider tag */}
            <img src={provider.profileImage} />
            <h4>{provider.providerType}</h4>
          </div>
          <div className={styles.contentArea}>
            {/* Provider details */}
            <h1>{provider.name}</h1>
            <div className={styles.stars}>{renderStars(provider.rating)}</div>
            <p><span>Specialties:</span> {provider.services.join(' | ')}</p>
            <p>{truncateBio(provider.bio)}</p>
            <div className={styles.callToAction}>
              <button type='button' onClick={() => handleKnowMoreClick(provider.id)}>Know More</button>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.pagination}>
        {Array.from({ length: Math.ceil(providers.length / ITEMS_PER_PAGE) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className={index + 1 === currentPage ? styles.active : ''}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
    </>
  );
}

export default ProvidersCard;
