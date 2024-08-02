'use client'
import React from 'react';
import styles from '../../Styles/Singleprovider.module.css';
import ProviderReviews from '../ProviderReviews';
import ReviewForm from '../ReviewForm';

type DoctorDetails = {
  id: number | string;
  gender: string;
  specialties: string[];
  conditionsTreated: string[];
  languagesSpoken: string[];
  procedurePerformed: string[];
  insurance: string[];
};

type FacilityDetails = {
  id: number | string;
  facilityphotos: string;
  insurance: string[];
  specialties: string[];
};

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
  providerType: string;
  providerID: number;
};

type ProviderDetailsContentProps = {
  provider: Provider;
  doctorDetails: DoctorDetails[] | null;
  facilityDetails: FacilityDetails[] | null;
  providerID: number | string;
  userID: number | string;
};

const ProviderDetailsContent: React.FC<ProviderDetailsContentProps> = ({ provider, doctorDetails, facilityDetails, providerID }) => {
  console.log("Provider ID:", providerID);

  const renderList = (items: string[]) => (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <div key={index} className="border border-[#cc] p-2 rounded-md flex items-center">
          {item}
        </div>
      ))}
    </div>
  );
  
  return (
    <div className={styles.DetailContent}>
      {provider.providerType === 'Doctor' && doctorDetails && (
        <>
          <div id="services" className={styles.DetailContentSection}>
            <h2>Services</h2>
            {renderList(provider.services)}
          </div>
          {doctorDetails.map((doctor) => (
            <div key={doctor.id}>
              <div className={styles.DetailContentSection}>
                <h2 id="gender">Gender</h2>
                <p>{doctor.gender}</p>
              </div>
              <div className={styles.DetailContentSection}>
                <h2 id="specialties">Specialties</h2>
                {renderList(doctor.specialties)}
              </div>
              <div className={styles.DetailContentSection}>
                <h2 id="conditions">Conditions Treated</h2>
                {renderList(doctor.conditionsTreated)}
              </div>
              <div className={styles.DetailContentSection}>
                <h2 id="languages">Languages Spoken</h2>
                {renderList(doctor.languagesSpoken)}
              </div>
              <div className={styles.DetailContentSection}>
                <h2 id="procedures">Procedures Performed</h2>
                {renderList(doctor.procedurePerformed)}
              </div>
              <div className={styles.DetailContentSection}>
                <h2 id="insurance">Insurance</h2>
                {renderList(doctor.insurance)}
              </div>
            </div>
          ))}
        </>
      )}

      {provider.providerType === 'Facility' && facilityDetails && (
        <>
          <div id="services" className={styles.DetailContentSection}>
            <h2>Services</h2>
            <p>{provider.services.join(', ')}</p>
          </div>
          {facilityDetails.map((facility) => (
            <div key={facility.id}>
              <div className={styles.DetailContentSection}>
                <h2 id="facilityphotos">Facility Photos</h2>
                <p>{facility.facilityphotos}</p>
              </div>
              <div className={styles.DetailContentSection}>
                <h2 id="insurance">Insurance</h2>
                {renderList(facility.insurance)}
              </div>
              <div className={styles.DetailContentSection}>
                <h2 id="specialties">Specialties</h2>
                {renderList(facility.specialties)}
              </div>
            </div>
          ))}
        </>
      )}
      <ProviderReviews providerID={providerID} />
      <div id="Review">
        <ReviewForm providerID={providerID} />
      </div>
    </div>
  );
};

export default ProviderDetailsContent;
