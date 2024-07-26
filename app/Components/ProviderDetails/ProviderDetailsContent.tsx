'use client'
import React from 'react';
import styles from '../../Styles/Singleprovider.module.css'


type ProviderDetailsContentProps = {
  provider: Provider;
  doctorDetails: DoctorDetails[] | null;
  facilityDetails: FacilityDetails[] | null;
 
};

const ProviderDetailsContent: React.FC<ProviderDetailsContentProps> = ({ provider, doctorDetails, facilityDetails }) => {


  return (
    <div className={styles.DetailContent}>
      {provider.providerType === 'Doctor' && doctorDetails && (
        <>
          <div id="services" className={styles.DetailContentSection}>
            <h2>Services</h2>
            <p>{provider.services}</p>
          </div>
          {doctorDetails.map((doctor) => (
            <div key={doctor.id}>
              <div className={styles.DetailContentSection}>
                <h2 id="gender">Gender</h2>
                <p>{doctor.gender}</p>
              </div>
              <div className={styles.DetailContentSection}>
                <h2 id="specialties">Specialties</h2>
                <p>{doctor.specialties}</p>
              </div>
              <div className={styles.DetailContentSection}>
                <h2 id="conditions">Conditions Treated</h2>
                <p>{doctor.conditionsTreated}</p>
              </div>
              <div className={styles.DetailContentSection}>
                <h2 id="languages">Languages Spoken</h2>
                <p>{doctor.languagesSpoken}</p>
              </div>
              <div className={styles.DetailContentSection}>
                <h2 id="procedures">Procedures Performed</h2>
                <p>{doctor.procedurePerformed}</p>
              </div>
              <div className={styles.DetailContentSection}>
                <h2 id="insurance">Insurance</h2>
                <p>{doctor.insurance}</p>
              </div>
            </div>
          ))}
        </>
      )}

      {provider.providerType === 'Facility' && facilityDetails && (
        <>
          <div id="services" className={styles.DetailContentSection}>
            <h2>Services</h2>
            <p>{provider.services}</p>
          </div>
          {facilityDetails.map((facility) => (
            <div key={facility.id}>
              <div className={styles.DetailContentSection}>
                <h2 id="facilityphotos">Facility Photos</h2>
                <p>{facility.facilityphotos}</p>
              </div>
              <div className={styles.DetailContentSection}>
                <h2 id="insurance">Insurance</h2>
                <p>{facility.insurance}</p>
              </div>
              <div className={styles.DetailContentSection}>
                <h2 id="specialties">Specialties</h2>
                <p>{facility.specialties}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ProviderDetailsContent;
