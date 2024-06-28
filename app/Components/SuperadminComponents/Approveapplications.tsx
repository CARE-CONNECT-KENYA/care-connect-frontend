'use client';

import React, { useEffect, useState } from 'react';
import styles from './ProviderCard.module.css';

type Provider = {
  bio: string;
  email: string;
  id: number;
  location: string;
  name: string;
  number: number;
  profileImage: string;
  reg_date: string;
  services: string[];
  status: boolean;
  user_id: number;
  website: string;
  workingHours: string;
};

const Approveapplications: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch('care/superadmin/providers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch providers');
        }

        const data = await response.json();
        setProviders(data); // Directly set the array to state
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchProviders();
  }, []);

  const approveProvider = async (providerID: number) => {
    try {
      const response = await fetch(`care/superadmin/aproveprovider/${providerID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ status: true }), // Change status from false to true
      });

      if (!response.ok) {
        throw new Error('Failed to approve provider');
      }

      // Update local providers list after approval
      const updatedProviders = providers.map(provider =>
        provider.id === providerID ? { ...provider, status: true } : provider
      );
      setProviders(updatedProviders);
    } catch (error) {
      console.error('Error approving provider:', error);
    }
  };

  return (
    <div>
      <h1>Approve Applications</h1>
      <div>
        {providers.map(provider => (
          <div key={provider.id} className={styles.CardContainer}>
            <h2>{provider.name}</h2>
            <p>Status: {provider.status ? 'Approved' : 'Pending'}</p>
            <button
              onClick={() => approveProvider(provider.id)}
              disabled={provider.status} // Disable button if already approved
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Approveapplications;
