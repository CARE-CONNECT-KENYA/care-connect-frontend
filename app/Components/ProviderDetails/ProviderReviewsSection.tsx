'use client'
import React from 'react';
import ProviderReviews from '../ProviderReviews';
import ReviewForm from '../ReviewForm';
import styles from '../../Styles/Singleprovider.module.css';

type ProviderReviewsSectionProps = {
  providerID: number | string;
  providerType: string ;
};

const ProviderReviewsSection: React.FC<ProviderReviewsSectionProps> = ({ providerID, provider}) => {
  return (
    <div className={styles.DetailLinks}>
        <ul>
            <li><a href="#services">Services</a></li>
           {provider.providerType === 'Doctor' && <li><a href="#gender">Gender</a></li>}
           {provider.providerType === 'Doctor' && <li><a href="#specialties">Specialties</a></li>}
           {provider.providerType === 'Doctor' && <li><a href="#languages">Languages Spoken</a></li>}
           {provider.providerType === 'Doctor' && <li><a href="#conditions">Conditions Treated</a></li>}
           {provider.providerType === 'Doctor' && <li><a href="#procedures">Procedures Performed</a></li>}
           {provider.providerType === 'Doctor' && <li><a href="#insurance">Insurance</a></li>}
           {provider.providerType === 'Facility' && <li><a href="#facilityphotos">Facility Photos</a></li>}
           {provider.providerType === 'Facility' && <li><a href="#insurance">Insurance</a></li>}
           {provider.providerType === 'Facility' && <li><a href="#specialties">Specialties</a></li>}
          </ul>
      <ReviewForm providerID={providerID} />
      <ProviderReviews providerID={providerID} />
    </div>
  );
};

export default ProviderReviewsSection;
