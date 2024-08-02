'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../Styles/ProviderCard.module.css';

type Doctor = {
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
  rating: number | null;
};

const ITEMS_PER_PAGE = 9;

function ProviderDoctorListing() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        console.error('No access token found');
        return;
      }

      try {
        const response = await fetch('care/provider/doctors', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }

        const data = await response.json();
        setDoctors(data.Doctors); // Ensure the key matches the response from the endpoint
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const renderStars = (rating: number | null) => {
    if (rating === null) {
      return <p>No rating</p>;
    }

    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? styles.filledStar : styles.emptyStar}>
          ★
        </span>
      );
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

  const indexOfLastDoctor = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstDoctor = indexOfLastDoctor - ITEMS_PER_PAGE;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div>
        {currentDoctors.map((doctor) => (
          <div key={doctor.id} className={styles.CardContainer}>
            <div>
              {/* Image and provider tag */}
              <img src={doctor.profileImage} alt={doctor.name} />
              <h4>{doctor.providerType}</h4>
            </div>
            <div className={styles.contentArea}>
              {/* Doctor details */}
              <h1>{doctor.name}</h1>
              <div className={styles.stars}>{renderStars(doctor.rating)}</div>
              <p><span>Specialties:</span> {doctor.services.join(' | ')}</p>
              <p>{truncateBio(doctor.bio)}</p>
              <div className={styles.callToAction}>
                <button type='button' onClick={() => handleKnowMoreClick(doctor.id)}>Know More</button>
              </div>
            </div>
          </div>
        ))}
        <div className={styles.pagination}>
          {Array.from({ length: Math.ceil(doctors.length / ITEMS_PER_PAGE) }, (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)} className={index + 1 === currentPage ? styles.active : ''}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProviderDoctorListing;
