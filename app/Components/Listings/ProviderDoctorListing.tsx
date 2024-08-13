'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../Styles/ProviderCard.module.css';
import Filters from './DoctorsFilter';

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
  gender: string;
};

const ITEMS_PER_PAGE = 9;

function ProviderDoctorListing() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [ratingRangeFilter, setRatingRangeFilter] = useState<[number, number] | null>(null);
  const [servicesFilter, setServicesFilter] = useState<string[]>([]);

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
        setDoctors(data.Doctors);
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

  const applyFilters = (doctor: Doctor) => {
    if (genderFilter && doctor.gender !== genderFilter) return false;
    if (ratingRangeFilter && (doctor.rating === null || doctor.rating < ratingRangeFilter[0] || doctor.rating > ratingRangeFilter[1])) return false;
    if (servicesFilter.length > 0 && !servicesFilter.some(service => doctor.services.includes(service))) return false;
    return true;
  };

  const handleClearFilters = () => {
    setGenderFilter(null);
    setRatingRangeFilter(null);
    setServicesFilter([]);
    setCurrentPage(1); // Reset to first page after clearing filters
  };

  const indexOfLastDoctor = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstDoctor = indexOfLastDoctor - ITEMS_PER_PAGE;
  const filteredDoctors = doctors.filter(applyFilters);
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={styles.ListingsContainer}>
        <div className={styles.providerDoctorListing}>
        <Filters
          genderFilter={genderFilter}
          setGenderFilter={setGenderFilter}
          ratingRangeFilter={ratingRangeFilter}
          setRatingRangeFilter={setRatingRangeFilter}
          servicesFilter={servicesFilter}
          setServicesFilter={setServicesFilter}
          handleClearFilters={handleClearFilters}
        />
        
        <div className={styles.listingArea}>
          {currentDoctors.map((doctor) => (
            <div key={doctor.id} className={styles.CardContainer}>
              <div>
                <img src={doctor.profileImage} alt={doctor.name} />
                <h4>{doctor.providerType}</h4>
              </div>
              <div className={styles.contentArea}>
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
            {Array.from({ length: Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE) }, (_, index) => (
              <button key={index} onClick={() => paginate(index + 1)} className={index + 1 === currentPage ? styles.active : ''}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderDoctorListing;
