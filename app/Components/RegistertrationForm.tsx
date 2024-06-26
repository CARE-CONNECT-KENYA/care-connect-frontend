'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import styles from '../Styles/RegistartionForm.module.css'

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
  facilityphotos: string;
  insurance: string;
  specialties: string;
}

interface DoctorData {
  providerID: string;
  LanguagesSpoken: string;
  Gender: string;
  specialties: string;
  conditionsTreated: string;
  Procedureperformed: string;
  insurance: string;
}

const RegistrationForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [providerType, setProviderType] = useState<string>('');
  const [providerID, setProviderId] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loginError, setLoginError] = useState<boolean>(false); // State for login error
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleNext = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Login is required ');
      setLoginError(true); // Set login error state to true
      return;
    }

    try {
      let imageUrl = '';

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'ngo-connect');

        const cloudinaryResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/dmrtbhnzu/image/upload',
          formData
        );

        imageUrl = cloudinaryResponse.data.secure_url;
      }

      const userId = JSON.parse(atob(token.split('.')[1])).user_id;
      const headers = { Authorization: `Bearer ${token}` };

      if (step === 1) {
        const providerData: ProviderData = {
          bio: (document.getElementsByName('bio')[0] as HTMLTextAreaElement).value,
          providerName: (document.getElementsByName('providerName')[0] as HTMLInputElement).value,
          email: (document.getElementsByName('email')[0] as HTMLInputElement).value,
          phoneNumber: (document.getElementsByName('phoneNumber')[0] as HTMLInputElement).value,
          workingHours: (document.getElementsByName('workingHours')[0] as HTMLInputElement).value,
          profileImage: imageUrl,
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

        const providerID = response.data.providerID;
        setProviderId(providerID);
        localStorage.setItem('providerID', providerID);
        console.log(providerID);

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
      setErrors([error.response ? error.response.data.message : error.message]);
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
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
          facilityphotos: (e.currentTarget.elements.namedItem('facilityPhotos') as HTMLInputElement).value,
          insurance: (e.currentTarget.elements.namedItem('insurance') as HTMLInputElement).value,
          specialties: (e.currentTarget.elements.namedItem('specialties') as HTMLInputElement).value,
        };

        // Log the facility data
        console.log('Submitting Facility Data:', facilityData);

        // Submit facility data to the backend
        await axios.post('/care/newfacility', facilityData, { headers });
        console.log('Facility registered successfully');
      } else if (step === 3 && providerType === 'Doctor') {
        const doctorData: DoctorData = {
          providerID: providerID!,
          LanguagesSpoken: (e.currentTarget.elements.namedItem('LanguagesSpoken') as HTMLInputElement).value,
          Gender: (e.currentTarget.elements.namedItem('Gender') as HTMLSelectElement).value,
          specialties: (e.currentTarget.elements.namedItem('specialties') as HTMLInputElement).value,
          conditionsTreated: (e.currentTarget.elements.namedItem('conditionsTreated') as HTMLInputElement).value,
          Procedureperformed: (e.currentTarget.elements.namedItem('Procedureperformed') as HTMLInputElement).value,
          insurance: (e.currentTarget.elements.namedItem('insurance') as HTMLInputElement).value
        };

        // Log the doctor data
        console.log('Submitting Doctor Data:', doctorData);

        // Submit doctor data to the backend
        await axios.post('/care/newdoctor', doctorData, { headers });
        console.log('Doctor registered successfully');
      }

      // Optionally, you can navigate to the next step after submission if needed
      if (providerType === 'Facility' && step === 2) {
        setStep(3);
      } else if (providerType === 'Doctor' && step === 3) {
        setStep(4);
      } else {
        setStep(step + 1);
      }

    } catch (error) {
      // Log the error response from the server
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      setErrors([error.response ? error.response.data.message : error.message]);
    }
  };

  return (
    <div>
      {loginError && (
        <div className={styles.ErrorContainer}>
          <p className={styles.Error}>Login is required to proceed.</p>
        </div>
      )}
      
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
            <input name='profileImage' type='file' onChange={handleFileChange} />
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
          {errors.length > 0 && (
            <div className={styles.ErrorContainer}>
              <p className={styles.Error}>{errors[0]}</p>
            </div>
          )}
        </div>
      )}

      {step === 2 && providerType === 'Facility' && (
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
              <p className={styles.Error}>{errors[0]}</p>
            </div>
          )}
        </div>
      )}

      {step === 3 && providerType === 'Doctor' && (
        <div className={styles.DoctorDetails}>
          <form className={styles.ProvidersForm} onSubmit={handleSubmit}>
            <input name='LanguagesSpoken' type='text' placeholder='Languages Spoken' />
            <select name='Gender'>
              <option value='' disabled selected hidden>Doctor's Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
            <input name='specialties' type='text' placeholder='Specialties' />
            <input name='conditionsTreated' type='text' placeholder='Conditions Treated' />
            <input name='Procedureperformed' type='text' placeholder='Procedures Performed' />
            <input name='insurance' type='text' placeholder='Insurance' />
            <div className={styles.ButtonContainer}>
              <button type='button' onClick={handleBack}>Back</button>
              <button type='submit'>Submit</button>
            </div>
          </form>
          {errors.length > 0 && (
            <div className={styles.ErrorContainer}>
              <p className={styles.Error}>{errors[0]}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;
