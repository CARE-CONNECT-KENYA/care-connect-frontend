'use client'
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ProviderHeader from './ProviderDetails/ProviderHeader';
import ProviderDetailsContent from './ProviderDetails/ProviderDetailsContent';
import ProviderReviewsSection from './ProviderDetails/ProviderReviewsSection';
import styles from '../Styles/Singleprovider.module.css'

const ProviderDetail: React.FC = () => {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails[] | null>(null);
  const [facilityDetails, setFacilityDetails] = useState<FacilityDetails[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullBio, setShowFullBio] = useState(false);

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

          // Fetch additional details based on provider type
          if (data.providerType === 'Doctor') {
            const doctorResponse = await fetch(`/care/doctor/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              },
            });

            if (!doctorResponse.ok) {
              const errorText = await doctorResponse.text();
              throw new Error(`Failed to fetch doctor details: ${errorText}`);
            }

            const doctorData = await doctorResponse.json();
            setDoctorDetails(doctorData.doctor_info);
          } else if (data.providerType === 'Facility') {
            const facilityResponse = await fetch(`/care/facility/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              },
            });

            if (!facilityResponse.ok) {
              const errorText = await facilityResponse.text();
              throw new Error(`Failed to fetch facility details: ${errorText}`);
            }

            const facilityData = await facilityResponse.json();
            setFacilityDetails(facilityData.facility);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setError((error as Error).message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProvider();
  }, [id]);

  const handleReadMoreToggle = () => {
    setShowFullBio(!showFullBio);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.SingleproviderContainer}>
      {provider && (
        <>
          <ProviderHeader provider={provider} showFullBio={showFullBio} onReadMoreToggle={handleReadMoreToggle} />
          <div className={styles.DetailSections}>
            <ProviderReviewsSection providerID={id} provider={provider} />
            <ProviderDetailsContent provider={provider} doctorDetails={doctorDetails} facilityDetails={facilityDetails} />
            
          </div>
        </>
      )}
    </div>
  );
};

export default ProviderDetail;
