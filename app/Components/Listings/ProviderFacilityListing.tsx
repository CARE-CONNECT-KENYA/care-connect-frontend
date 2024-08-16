'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FacilityFilters from './FacilitiesFilter';
import styles from '../../Styles/ProviderCard.module.css';
import LoadingComponents from '../LoadingComponents';

type Facility = {
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

function ProviderFacilityListing() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ratingRangeFilter, setRatingRangeFilter] = useState<[number, number] | null>(null);
  const [servicesFilter, setServicesFilter] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true); // New loading state

  const router = useRouter();

  useEffect(() => {
    const fetchFacilities = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        console.error('No access token found');
        return;
      }

      try {
        const response = await fetch('care/provider/facility', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch facilities');
        }

        const data = await response.json();

        // Simulate a delay of 3 seconds for loading state
        setTimeout(() => {
          setFacilities(data.Facilities);
          setLoading(false); // Set loading to false after data is fetched
        }, 3000);
      } catch (error) {
        console.error('Error fetching facilities:', error);
        setLoading(false); // Ensure loading is set to false even if there's an error
      }
    };

    fetchFacilities();
  }, []);

  const renderStars = (rating: number | null) => {
    if (rating === null) {
      return <p>No rating</p>;
    }

    const stars: JSX.Element[] = [];
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

  const applyFilters = (facility: Facility) => {
    if (ratingRangeFilter && (facility.rating === null || facility.rating < ratingRangeFilter[0] || facility.rating > ratingRangeFilter[1])) return false;
    if (servicesFilter.length > 0 && !servicesFilter.some(service => facility.services.includes(service))) return false;
    if (searchTerm && !facility.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  };

  const handleClearFilters = () => {
    setRatingRangeFilter(null);
    setServicesFilter([]);
    setSearchTerm('');
    setCurrentPage(1); // Reset to the first page after clearing filters
  };

  const indexOfLastFacility = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstFacility = indexOfLastFacility - ITEMS_PER_PAGE;
  const filteredFacilities = facilities.filter(applyFilters);
  const currentFacilities = filteredFacilities.slice(indexOfFirstFacility, indexOfLastFacility);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className={styles.ListingsContainer}>
        {/* Search Bar */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.providerDoctorListing}>
          {/* Facility Filters Sidebar */}
          <div className={styles.ListSidebar}>
            <FacilityFilters
              ratingRangeFilter={ratingRangeFilter}
              setRatingRangeFilter={setRatingRangeFilter}
              servicesFilter={servicesFilter}
              setServicesFilter={setServicesFilter}
              handleClearFilters={handleClearFilters}
            />
          </div>

          {/* Facility Listing */}
          <div className={styles.listingArea}>
            {loading ? (
              <LoadingComponents />
            ) : (
              currentFacilities.map((facility) => (
                <div key={facility.id} className={styles.CardContainer}>
                  <div>
                    {/* Image and provider tag */}
                    <img src={facility.profileImage} alt={facility.name} />
                    <h4>{facility.providerType}</h4>
                  </div>
                  <div className={styles.contentArea}>
                    {/* Facility details */}
                    <h1>{facility.name}</h1>
                    <div className={styles.stars}>{renderStars(facility.rating)}</div>
                    <p><span>Services: </span> {facility.services.join(' | ')}</p>
                    <p>{truncateBio(facility.bio)}</p>
                    <div className={styles.callToAction}>
                      <button type="button" onClick={() => handleKnowMoreClick(facility.id)}>Know More</button>
                    </div>
                  </div>
                </div>
              ))
            )}
            {!loading && (
              <div className={styles.pagination}>
                {Array.from({ length: Math.ceil(filteredFacilities.length / ITEMS_PER_PAGE) }, (_, index) => (
                  <button key={index} onClick={() => paginate(index + 1)} className={index + 1 === currentPage ? styles.active : ''}>
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProviderFacilityListing;
