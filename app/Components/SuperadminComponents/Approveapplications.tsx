'use client';

import React, { useEffect, useState } from 'react';
import styles from './ProviderCard.module.css';

type Provider = {
  bio: string;
  email: string;
  id: number;
  location: string;
  name: string;
  providerType: string;
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
        setProviders(data);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchProviders();
  }, []);

  const updateProviderStatus = async (providerID: number, status: boolean) => {
    try {
      const response = await fetch(`care/superadmin/aproveprovider/${providerID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update provider status');
      }

      // Update local providers list after status change
      const updatedProviders = providers.map(provider =>
        provider.id === providerID ? { ...provider, status } : provider
      );
      setProviders(updatedProviders);
    } catch (error) {
      console.error('Error updating provider status:', error);
    }
  };

  return (
    <div>
      <h1>Approve Applications</h1>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Provider Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {providers.map(provider => (
            <tr key={provider.id}>
              <td>{provider.name}</td>
              <td>{provider.email}</td>
              <td>{provider.providerType}</td>
              <td>{provider.status ? 'Approved' : 'Pending'}</td>
              <td>
                <select
                  onChange={(e) => {
                    const newStatus = e.target.value === 'approve';
                    updateProviderStatus(provider.id, newStatus);
                  }}
                  value={provider.status ? 'approve' : 'suspend'}
                  disabled={provider.status === undefined}
                >
                  <option value="approve">Approve</option>
                  <option value="suspend">Suspend</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Approveapplications;
