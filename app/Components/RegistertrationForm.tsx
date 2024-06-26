'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import styles from '../Styles/RegistartionForm.module.css';

interface ProviderData {
  bio: string;
  providerName: string;
  email: string;
  phoneNumber: string;
  workingHours: string;
  profileImage: string;
  website: string;
  location: string;
  providerType: string;
  services: string[];
  userId: string;
}

interface FacilityData {
  providerID: string;
  insurance: string;
  specialties: string;
  facilityPhotos: string;
}

interface DoctorData {
  providerID: string;
  languages: string;
  gender: string;
  specialties: string;
  conditions: string;
  procedures: string;
  insurance: string;
}

const RegistrationForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [providerType, setProviderType] = useState<string>('');
  const [providerID, setProviderId] = useState<string | null>(null);

  const handleNext = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      const userId = JSON.parse(atob(token.split('.')[1])).user_id;
      const headers = { Authorization: `Bearer ${token}` };

      if (step === 1) {
        const providerData: ProviderData = {
          bio: (document.getElementsByName('bio')[0] as HTMLTextAreaElement).value,
          providerName: (document.getElementsByName('providerName')[0] as HTMLInputElement).value,
          email: (document.getElementsByName('email')[0] as HTMLInputElement).value,
          phoneNumber: (document.getElementsByName('phoneNumber')[0] as HTMLInputElement).value,
          workingHours: (document.getElementsByName('workingHours')[0] as HTMLInputElement).value,
          profileImage: (document.getElementsByName('profileImage')[0] as HTMLInputElement).value,
          website: (document.getElementsByName('website')[0] as HTMLInputElement).value,
          location: (document.getElementsByName('location')[0] as HTMLInputElement).value,
          providerType,
          services: (document.getElementsByName('services')[0] as HTMLInputElement).value.split(',').map(service => service.trim()),
          userId
        };

        // Log the provider data
        console.log('Submitting Provider Data:', providerData);

        const response = await axios.post('/care/newprovider', providerData, { headers });

        // Log the response from the server
        console.log('Provider Response:', response);

        const providerID = response.data.id;
        setProviderId(providerID);
        localStorage.setItem('providerID', providerID);

        if (providerType === 'Facility') {
          setStep(2);
        } else if (providerType === 'Doctor') {
          setStep(3);
        } else {
          setStep(step + 1);
        }
      } else {
        if (providerType === 'Facility' && step === 2) {
          setStep(3);
        } else if (providerType === 'Doctor' && step === 3) {
          setStep(4);
        } else {
          setStep(step + 1);
        }
      }
    } catch (error) {
      // Log the error response from the server
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleProviderTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setProviderType(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };

      if (step === 2 && providerType === 'Facility') {
        const facilityData: FacilityData = {
          providerID: providerID!,
          insurance: (e.currentTarget.elements.namedItem('insurance') as HTMLInputElement).value,
          specialties: (e.currentTarget.elements.namedItem('specialties') as HTMLInputElement).value,
          facilityPhotos: (e.currentTarget.elements.namedItem('facilityPhotos') as HTMLInputElement).value
        };

        // Log the facility data
        console.log('Submitting Facility Data:', facilityData);

        const formData = new FormData();
        for (let key in facilityData) {
          formData.append(key, (facilityData as any)[key]);
        }

        await axios.post('/care/newfacility', formData, { headers });
        console.log('Facility registered successfully');
      } else if (step === 3 && providerType === 'Doctor') {
        const doctorData: DoctorData = {
          providerID: providerID!,
          languages: (e.currentTarget.elements.namedItem('languages') as HTMLInputElement).value,
          gender: (e.currentTarget.elements.namedItem('gender') as HTMLSelectElement).value,
          specialties: (e.currentTarget.elements.namedItem('specialties') as HTMLInputElement).value,
          conditions: (e.currentTarget.elements.namedItem('conditions') as HTMLInputElement).value,
          procedures: (e.currentTarget.elements.namedItem('procedures') as HTMLInputElement).value,
          insurance: (e.currentTarget.elements.namedItem('insurance') as HTMLInputElement).value
        };

        // Log the doctor data
        console.log('Submitting Doctor Data:', doctorData);

        const formData = new FormData();
        for (let key in doctorData) {
          formData.append(key, (doctorData as any)[key]);
        }

        await axios.post('/care/newdoctor', formData, { headers });
        console.log('Doctor registered successfully');
      }
    } catch (error) {
      // Log the error response from the server
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      {step === 1 && (
        <div className={styles.ProviderDetails}>
          <form className={styles.ProvidersForm} onSubmit={handleSubmit}>
            <input name='providerName' type='text' placeholder='Provider name' />
            <textarea name='bio' placeholder='Bio' />
            <input name='email' type='text' placeholder='Email' />
            <input name='phoneNumber' type='number' placeholder='Phone number' />
            <input name='location' type='text' placeholder='Location' />
            <input name='website' type='text' placeholder='Website' />
      
            <input name='services' type='text' placeholder='Services (comma-separated)' />
            <input name='profileImage' type='text' placeholder='Profile image URL' />
            <input name='workingHours' list='datalist-hours' placeholder='Choose working hours' />
            <datalist id='datalist-hours'>
              <option>MON-FRI 8:00AM - 5:00PM</option>
              <option>MON-FRI 8:00AM - 5:00PM</option>
            </datalist>
            <select name='providerType' onChange={handleProviderTypeChange}>
              <option value='' disabled selected hidden>Choose Provider type</option>
              <option value='Facility'>Facility</option>
              <option value='Doctor'>Doctor</option>
            </select>
            <button type='button' onClick={handleNext}>Next</button>
            <button type='submit' hidden></button>
          </form>
        </div>
      )}

      {step === 2 && providerType === 'Facility' && (
        <div className={styles.FacilityDetails}>
          <form className={styles.ProvidersForm} onSubmit={handleSubmit}>
            <input name='insurance' type='text' placeholder='Insurance' />
            <input name='specialties' type='text' placeholder='Specialties' />
            <input name='facilityPhotos' type='text' placeholder='Facility photos URL' />
            <div className={styles.ButtonContainer}>
              <button type='button' onClick={handleBack}>Back</button>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      )}

      {step === 3 && providerType === 'Doctor' && (
        <div className={styles.DoctorDetails}>
          <form className={styles.ProvidersForm} onSubmit={handleSubmit}>
            <input name='languages' type='text' placeholder='Languages' />
            <select name='gender'>
              <option value='' disabled selected hidden>Doctor's Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Rather Not say'>Rather Not say</option>
            </select>
            <input name='specialties' type='text' placeholder='Specialties' />
            <input name='conditions' type='text' placeholder='Conditions' />
            <input name='procedures' type='text' placeholder='Procedures' />
            <input name='insurance' type='text' placeholder='Insurance' />
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
