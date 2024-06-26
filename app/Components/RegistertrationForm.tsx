'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import styles from '../Styles/RegistartionForm.module.css'

interface ProviderData {
  providerName: string;
  email: string;
  phoneNumber: string;
  location: string;
  website: string;
  description: string;
  services: string;
  profileImage: File | null;
  workingHours: string;
  providerType: string;
  userId: string;
}

interface FacilityData {
  providerId: string;
  insurance: string;
  specialties: string;
  facilityPhotos: File | null;
}

interface DoctorData {
  providerId: string;
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
  const [providerId, setProviderId] = useState<string | null>(null);

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
      const userId = JSON.parse(atob(token.split('.')[1])).user_id; // Assuming JWT token structure
      const headers = { Authorization: `Bearer ${token}` };

      if (step === 1) {
        const providerData: ProviderData = {
          providerName: (e.currentTarget.elements.namedItem('providerName') as HTMLInputElement).value,
          email: (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value,
          phoneNumber: (e.currentTarget.elements.namedItem('phoneNumber') as HTMLInputElement).value,
          location: (e.currentTarget.elements.namedItem('location') as HTMLInputElement).value,
          website: (e.currentTarget.elements.namedItem('website') as HTMLInputElement).value,
          description: (e.currentTarget.elements.namedItem('description') as HTMLTextAreaElement).value,
          services: (e.currentTarget.elements.namedItem('services') as HTMLInputElement).value,
          profileImage: (e.currentTarget.elements.namedItem('profileImage') as HTMLInputElement).files?.[0] || null,
          workingHours: (e.currentTarget.elements.namedItem('workingHours') as HTMLInputElement).value,
          providerType,
          userId
        };

        const formData = new FormData();
        for (let key in providerData) {
          formData.append(key, (providerData as any)[key]);
        }

        const response = await axios.post('/care/newprovider', formData, { headers });
        setProviderId(response.data.id);
        handleNext();
      } else if (step === 2 && providerType === 'Facility') {
        const facilityData: FacilityData = {
          providerId: providerId!,
          insurance: (e.currentTarget.elements.namedItem('insurance') as HTMLInputElement).value,
          specialties: (e.currentTarget.elements.namedItem('specialties') as HTMLInputElement).value,
          facilityPhotos: (e.currentTarget.elements.namedItem('facilityPhotos') as HTMLInputElement).files?.[0] || null
        };

        const formData = new FormData();
        for (let key in facilityData) {
          formData.append(key, (facilityData as any)[key]);
        }

        await axios.post('/care/newfacility', formData, { headers });
        console.log('Facility registered successfully');
      } else if (step === 3 && providerType === 'Doctor') {
        const doctorData: DoctorData = {
          providerId: providerId!,
          languages: (e.currentTarget.elements.namedItem('languages') as HTMLInputElement).value,
          gender: (e.currentTarget.elements.namedItem('gender') as HTMLSelectElement).value,
          specialties: (e.currentTarget.elements.namedItem('specialties') as HTMLInputElement).value,
          conditions: (e.currentTarget.elements.namedItem('conditions') as HTMLInputElement).value,
          procedures: (e.currentTarget.elements.namedItem('procedures') as HTMLInputElement).value,
          insurance: (e.currentTarget.elements.namedItem('insurance') as HTMLInputElement).value
        };

        const formData = new FormData();
        for (let key in doctorData) {
          formData.append(key, (doctorData as any)[key]);
        }

        await axios.post('/care/newdoctor', formData, { headers });
        console.log('Doctor registered successfully');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      {/* Provider form */}
      {step === 1 && (
        <div className={styles.ProviderDetails}>
          <form className={styles.ProvidersForm} onSubmit={handleSubmit}>
            <input name='providerName' type='text' placeholder='Providername' />
            <input name='email' type='text' placeholder='email' />
            <input name='phoneNumber' type='number' placeholder='Phone number' />
            <input name='location' type='text' placeholder='Location' />
            <input name='website' type='text' placeholder='Website' />
            <textarea name='description' placeholder='description' />
            <input name='services' type='text' placeholder='Services' />
            <input name='profileImage' type='file' placeholder='Upload profile image' />
            <input name='workingHours' list='datalist-hours' placeholder='choose working hours' />
            <datalist id='datalist-hours'>
              <option>MON-FRID 8:00AM - 5:00PM</option>
              <option>MON-FRID 8:00AM - 5:00PM</option>
            </datalist>
            <select name='providerType' onChange={handleProviderTypeChange}>
              <option value='' disabled selected hidden>Choose Provider type</option>
              <option value='Facility'>Facility</option>
              <option value='Doctor'>Doctor</option>
            </select>
            <button type='button' onClick={handleNext}>Next</button>
            <button type='submit' hidden></button> {/* Hidden submit button to allow form submission */}
          </form>
        </div>
      )}

      {/* Facility form */}
      {step === 2 && providerType === 'Facility' && (
        <div className={styles.FacilityDetails}>
          <form className={styles.ProvidersForm} onSubmit={handleSubmit}>
            <input name='insurance' type='text' placeholder='insurance' />
            <input name='specialties' type='text' placeholder='specialties' />
            <input name='facilityPhotos' type='file' placeholder='facility photos' />
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
            <input name='languages' type='text' placeholder='Languages' />
            <select name='gender'>
              <option value='' disabled selected hidden>Doctors Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Rather Not say'>Rather Not say</option>
            </select>
            <input name='specialties' type='text' placeholder='specialties' />
            <input name='conditions' type='text' placeholder='conditions' />
            <input name='procedures' type='text' placeholder='procedures' />
            <input name='insurance' type='text' placeholder='insurance' />
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
