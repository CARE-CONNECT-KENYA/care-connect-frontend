'use client'
// components/ProviderRegistration.tsx
import React, { ChangeEvent } from 'react';
import styles from '../../Styles/RegistartionForm.module.css';

interface Props {
  handleNext: () => void;
  handleProviderTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: string[];
  setErrors: (errors: string[]) => void;
  setProviderType: (type: string) => void;
  setImageFile: (file: File | null) => void;
}

const ProviderRegistration: React.FC<Props> = ({ handleNext, handleProviderTypeChange, handleFileChange, errors }) => {
  return (
    <div className={styles.ProviderDetails}>
      <form className={styles.ProvidersForm} onSubmit={(e) => e.preventDefault()}>
        <input name='providerName' type='text' placeholder='Provider name' />
        <input name='email' type='text' placeholder='Email' />
        <input name='phoneNumber' type='number' placeholder='Phone number' />
        <textarea name='bio' placeholder='Bio' />
        <input name='location' type='text' placeholder='Location' />
        <input name='website' type='text' placeholder='Website' />
        <input name='services' type='text' placeholder='Services (comma-separated)' />
        <input name='profileImage' type='file' onChange={handleFileChange} />
        <input name='workingHours' list='datalist-hours' placeholder='Choose working hours' />
        <datalist id='datalist-hours'>
          <option>MON-FRI 8:00AM - 5:00PM</option>
          <option>SAT-SUN 10:00AM - 4:00PM</option>
        </datalist>
        <select name='providerType' className={styles.selectDropdown} onChange={handleProviderTypeChange}>
          <option value='' disabled selected hidden>Choose Provider type</option>
          <option value='Facility'>Facility</option>
          <option value='Doctor'>Doctor</option>
        </select>
        <button type='button' onClick={handleNext}>Next</button>
      </form>
      {errors.length > 0 && (
        <div className={styles.ErrorContainer}>
          <p className={styles.Error}>{errors.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default ProviderRegistration;
