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
  providerType:string;
  profileImage:string;
};

function FeaturedProviders() {
  const [providers, setProviders] = useState<Provider[]>([]);
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

  const handleKnowMoreClick = (id: number) => {
    router.push(`/provider/${id}`);
  };

  return (
    <div className={styles.FeaturedCardContainer}>
      {providers.map((provider) => (
        <div key={provider.id} >
          <div className={styles.FeaturedCard}>
            <div>
                <img src={provider.profileImage}  />
            </div>
            <div>
                <div className={styles.featuredDetails}>
                    <p className={styles.higlight}>{provider.providerType}</p>
                    <p>Rating</p>

                </div>
                <h1>{provider.name}</h1>
            </div>
            <div className={styles.featureCAT}>
              <button type='button' onClick={() => handleKnowMoreClick(provider.id)}>Know More</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeaturedProviders;
