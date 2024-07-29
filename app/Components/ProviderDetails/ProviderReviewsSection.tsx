'use client'
import React from 'react';
import styles from '../../Styles/Singleprovider.module.css';


type provider = {
  providerType: string;
}

type ProviderReviewsSectionProps = {
  provider: provider | null;
  providerID: string; 
};

const ProviderReviewsSection: React.FC<ProviderReviewsSectionProps> = ({ provider}) => {
  
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
                  <li><a href='#Review'>Write a Review</a></li>
                </ul>
      
      
    </div>
  );
};

export default ProviderReviewsSection;
