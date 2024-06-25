'use client'

import React, { useState } from 'react'
import styles from '../Styles/RegistartionForm.module.css'

function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [providerType, setProviderType] = useState('');

  const handleNext = () => {
    if (providerType === 'Facility' && step === 1) {
      setStep(2); // Skip to step 2 if provider type is Facility
    } else if (providerType === 'Doctor' && step === 1) {
      setStep(3); // Skip to step 3 if provider type is Doctor
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleProviderTypeChange = (e) => {
    setProviderType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found');
      return;
    }
    // Handle form submission here
    console.log('Form submitted');
  };

  return (
    <div>
      {/* Provider form */}
      {step === 1 && (
        <div className={styles.ProviderDetails}>
          <form className={styles.ProvidersForm}>
            <input type='text' placeholder='Providername' />
            <input type='text' placeholder='email' />
            <input type='number' placeholder='Phone number' />
            <input type='text' placeholder='Location' />
            <input type='text' placeholder='Website' />
            <textarea placeholder='description' />
            <input type='text' placeholder='Services' />
            <input type='file' placeholder='Upload profile image' />
            <input list='datalist-hours' placeholder='choose working hours' />
            <datalist id='datalist-hours'>
              <option>MON-FRID 8:00AM - 5:00PM</option>
              <option>MON-FRID 8:00AM - 5:00PM</option>
            </datalist>
            <select onChange={handleProviderTypeChange}>
              <option value='' disabled selected hidden>Choose Provider type</option>
              <option value='Facility'>Facility</option>
              <option value='Doctor'>Doctor</option>
            </select>
            <button type='button' onClick={handleNext}>Next</button>
          </form>
        </div>
      )}

      {/* Facility form */}
      {step === 2 && providerType === 'Facility' && (
        <div className={styles.FacilityDetails}>
          <form className={styles.ProvidersForm} onSubmit={handleSubmit}>
            <input type='text' placeholder='insurance' />
            <input type='text' placeholder='specialties' />
            <input type='file' placeholder='facility photos' />
            <div className={styles.ButtonContainer}>
              <button type='button' onClick={handleBack}>Back</button>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      )}

      {/* Doctor form */}
      {step === 3 && providerType === 'Doctor' && (
        <div className={styles.DoctorDetails}>
          <form className={styles.ProvidersForm} onSubmit={handleSubmit}>
            <input type='text' placeholder='Languages' />
            <select>
              <option value='' disabled selected hidden>Doctors Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Rather Not say</option>
            </select>
            <input type='text' placeholder='specialties' />
            <input type='text' placeholder='conditions' />
            <input type='text' placeholder='procedures' />
            <input type='text' placeholder='insurance' />
            <div className={styles.ButtonContainer}>
              <button type='button' onClick={handleBack}>Back</button>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;
