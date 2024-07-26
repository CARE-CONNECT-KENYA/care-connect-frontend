'use client'
import React from 'react';
import ProviderReviews from '../ProviderReviews';
import ReviewForm from '../ReviewForm';
import styles from '../../Styles/Singleprovider.module.css';

type ProviderReviewsSectionProps = {
  providerID: number | string;
};

const ProviderReviewsSection: React.FC<ProviderReviewsSectionProps> = ({ providerID }) => {
  return (
    <div className={styles.DetailLinks}>
      <ul>
        <li><a href="#services">Services</a></li>
        <li><a href="#gender">Gender</a></li>
        <li><a href="#specialties">Specialties</a></li>
        <li><a href="#languages">Languages Spoken</a></li>
        <li><a href="#conditions">Conditions Treated</a></li>
        <li><a href="#procedures">Procedures Performed</a></li>
        <li><a href="#insurance">Insurance</a></li>
        <li><a href="#facilityphotos">Facility Photos</a></li>
        <li><a href="#insurance">Insurance</a></li>
        <li><a href="#specialties">Specialties</a></li>
      </ul>
      <ReviewForm providerID={providerID} />
      <ProviderReviews providerID={providerID} />
    </div>
  );
};

export default ProviderReviewsSection;
