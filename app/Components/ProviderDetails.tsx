'use client'
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Define the Provider type
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

const ProviderDetail: React.FC = () => {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  const id = pathname?.split('/').pop();

  useEffect(() => {
    const fetchProvider = async () => {
      if (id) {
        try {
          const response = await fetch(`/care/provider/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch provider details');
          }

          const data = await response.json();
          setProvider(data);
        } catch (error) {
          setError((error as Error).message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProvider();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {provider && (
        <>
          <img src={provider.profileImage} alt={provider.name} />
          <h1>{provider.name}</h1>
          <p>{provider.bio}</p>
          <p>Email: {provider.email}</p>
          <p>Location: {provider.location}</p>
          <p>Phone Number: {provider.number}</p>
          <p>Website: <a href={provider.website} target="_blank" rel="noopener noreferrer">{provider.website}</a></p>
          <p>Working Hours: {provider.workingHours}</p>
          <p>Registered Date: {provider.reg_date}</p>
          <p>Services: {provider.services.join(', ')}</p>
        </>
      )}
    </div>
  );
};

export default ProviderDetail;
