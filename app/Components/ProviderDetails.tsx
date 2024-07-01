'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from '../Styles/Singleprovider.module.css'

// Define the types
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
  providerType: string; // Added providerType
};

type DoctorDetails = {
  id: number;
  gender: string;
  specialties: string[];
  languagesSpoken: string[];
  conditionsTreated: string[];
  procedurePerformed: string[];
  insurance: string[];
  providerId: number;
};

type FacilityDetails = {
  id: number;
  facilityphotos: string[];
  insurance: string[];
  specialties: string[];
};

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
          console.log('Provider data:', data);
          setProvider(data);

          // Fetch additional details based on provider type
          if (data.providerType === 'Doctor') {
            console.log('Fetching doctor details for provider ID:', id);
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
            console.log('Doctor details:', doctorData);
            setDoctorDetails(doctorData.doctor_info);
          } else if (data.providerType === 'Facility') {
            console.log('Fetching facility details for provider ID:', id);
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
            console.log('Facility details:', facilityData);
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

  const truncateBio = (bio: string) => {
    const maxLength = 200;
    if (bio.length > maxLength && !showFullBio) {
      return bio.slice(0, maxLength) + '...';
    }
    return bio;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.SingleproviderConatiner}>
      <div className={styles.SingleProviderHeader}>
        <p>Header place something</p>
      </div>
      {provider && (
        <>
          <div className={styles.TopDetails}>
            <div className={styles.TopLeft}>
              <img src={provider.profileImage} alt={provider.name} />
              <p>Working Hours: {provider.workingHours}</p>
            </div>
            <div className={styles.TopRight}>
              <h1>{provider.name}</h1>
              <div className={styles.ContacInfo}>
                <p className={styles.Phonenumber}>{provider.number}</p>
                <p><span>Email:</span> {provider.email}</p>
              </div>
              <div className={styles.ContacInfo}>
                <p><span>Location:</span> {provider.location}</p>
                <div></div>
              </div>
              <p className={styles.bio}>{truncateBio(provider.bio)} <span onClick={handleReadMoreToggle} className={styles.ReadMore}>
                {showFullBio ? 'Show less' : 'Read more'}
              </span></p>
            </div>
            
          </div>

          

          {provider.providerType === 'Doctor' && doctorDetails && (
            <div>
              <h2>Doctor Details</h2>
              <p>Services: {provider.services}</p>
              {doctorDetails.map((doctor) => (
                <div key={doctor.id}>
                  <p>Gender: {doctor.gender}</p>
                  <p>Specialties: {doctor.specialties}</p>
                  <p>Languages Spoken: {doctor.languagesSpoken}</p>
                  <p>Conditions Treated: {doctor.conditionsTreated}</p>
                  <p>Procedures Performed: {doctor.procedurePerformed}</p>
                  <p>Insurance: {doctor.insurance}</p>
                </div>
              ))}
            </div>
          )}

          {provider.providerType === 'Facility' && facilityDetails && (
            <div>
              <h2>Facility Details</h2>
              {facilityDetails.map((facility) => (
                <div key={facility.id}>
                  <p>Facility Photos: {facility.facilityphotos}</p>
                  <p>Insurance: {facility.insurance}</p>
                  <p>Specialties: {facility.specialties}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProviderDetail;
