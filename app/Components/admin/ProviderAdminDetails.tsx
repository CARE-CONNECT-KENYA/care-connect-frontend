'use client'
import React, { useEffect, useState } from 'react';
import styles from '../../Styles/admin.module.css'

interface Provider {
  providerID: number;
  name: string;
  providerName: string;
  location: string;
  services: string;
  workingHours: string;
  created_at: string;
  email: string;
  profileImage: string;
  bio: string;
  website: string;
  number: number;
}

function ProviderAdminDetails() {
  const [providerAdmin, setProviderAdmin] = useState<Provider | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await fetch('/care/admin', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          
        });

        if (!response.ok) {
          throw new Error('Failed to fetch provider admin details');
        }

        const data = await response.json(); 
        setProviderAdmin(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchAdminDetails(); // Call the fetch function inside useEffect
  }, []); 

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : providerAdmin ? (
        <div className={styles.ProviderProfile}>
          <img src={providerAdmin.profileImage} />

          <div className={styles.profileContent}>

            <div className={styles.profileStart}>
              <h2>{providerAdmin.providerName}</h2>
              <h3><span >ID :</span>{providerAdmin.providerID}</h3>
            </div>
            
            <p><span>Email </span> {providerAdmin.email}</p>
            <p><span>Number</span> {providerAdmin.number}</p>
            <p><span>Reg date </span> {providerAdmin.created_at}</p>
            <p><span>Location</span> {providerAdmin.location}</p>
            
          </div>
         

        </div>
         
      ) : (
        <p>Loading...</p>
      )}


    </div>
  );
}

export default ProviderAdminDetails;
