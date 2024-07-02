'use client'
import React, { useEffect, useState } from 'react';

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
  phoneNumber: string;
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
        setError(error.message);
      }
    };

    fetchAdminDetails(); // Call the fetch function inside useEffect
  }, []); 

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : providerAdmin ? (
        <div>
          <h2>{providerAdmin.providerName}</h2>
          <p>Location: {providerAdmin.location}</p>
          <p>{providerAdmin.workingHours}</p>
          <p>{providerAdmin.bio}</p>
          <p>{providerAdmin.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProviderAdminDetails;
