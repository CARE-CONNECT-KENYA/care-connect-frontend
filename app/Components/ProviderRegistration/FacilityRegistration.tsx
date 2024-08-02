'use client'
// components/FacilityRegistration.tsx
import React, { FormEvent } from 'react';
import styles from '../../Styles/RegistartionForm.module.css';

interface FacilityData {
  providerID: string;
  facilityphotos: string;
  insurance: string;
  specialties: string;
}

interface Props {
  handleBack: () => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  errors: string[];
}

const FacilityRegistration: React.FC<Props> = ({ handleBack, handleSubmit, errors }) => {
  return (
    <div className={styles.FacilityDetails}>
      <form className={styles.ProvidersForm} onSubmit={handleSubmit}>
        <input name='insurance' type='text' placeholder='Insurance' />
        <input name='specialties' type='text' placeholder='Specialties' />
        <input name='facilityPhotos' type='file' placeholder='Facility photos URL' />
        <div className={styles.ButtonContainer}>
          <button type='button' onClick={handleBack}>Back</button>
          <button type='submit'>Submit</button>
        </div>
      </form>
      {errors.length > 0 && (
        <div className={styles.ErrorContainer}>
          <p className={styles.Error}>{errors.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default FacilityRegistration;
