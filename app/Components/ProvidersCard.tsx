'use client';

import React, { useEffect, useState } from 'react';
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

function ProvidersCard() {
  const [providers, setProviders] = useState<Provider[]>([]);

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

  return (
    <div>
      {providers.map((provider) => (
        <div key={provider.id} className={styles.CardContainer}>
          <div>
            {/* Image and provider tag */}
            <img src={provider.profileImage} />
            <h4>{provider.providerType}</h4>
          </div>
          <div className={styles.contentArea}>
            {/* Provider details */}
            <h1>{provider.name}</h1>
            <p><span>Specialties:</span> {provider.services.join(' | ')}</p>
            <p>Rating</p>
            <p>{provider.bio}</p>
            <div className={styles.callToAction}>
              <button type='button'>Know More</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProvidersCard;
