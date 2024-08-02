'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import ProviderRegistration from './ProviderRegistration';
import DoctorRegistration from './DoctorRegistration';
import FacilityRegistration from './FacilityRegistration';
import styles from '../../Styles/RegistartionForm.module.css';

const RegistrationForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [providerType, setProviderType] = useState<string>('');
  const [providerID, setProviderId] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loginError, setLoginError] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFields = (fields: { name: string; value: string }[], optionalFields: string[] = []): string[] => {
    const fieldErrors: string[] = [];
    fields.forEach((field) => {
      if (!optionalFields.includes(field.name) && !field.value.trim()) {
        fieldErrors.push(`${field.name} should not be empty`);
      }
    });
    return fieldErrors;
  };

  const handleNext = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Login is required');
      setLoginError(true);
      return;
    }

    const commonFields = [
      { name: 'Provider name', value: (document.getElementsByName('providerName')[0] as HTMLInputElement).value },
      { name: 'Email', value: (document.getElementsByName('email')[0] as HTMLInputElement).value },
      { name: 'Phone number', value: (document.getElementsByName('phoneNumber')[0] as HTMLInputElement).value },
      { name: 'Bio', value: (document.getElementsByName('bio')[0] as HTMLTextAreaElement).value },
      { name: 'Location', value: (document.getElementsByName('location')[0] as HTMLInputElement).value },
      { name: 'Working hours', value: (document.getElementsByName('workingHours')[0] as HTMLInputElement).value },
      { name: 'Provider type', value: providerType },
    ];

    const fieldErrors = validateFields(commonFields, ['Website']); // Website is now optional
    if (fieldErrors.length > 0) {
      setErrors(fieldErrors);
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
        const providerData = {
          bio: (document.getElementsByName('bio')[0] as HTMLTextAreaElement).value,
          providerName: (document.getElementsByName('providerName')[0] as HTMLInputElement).value,
          email: (document.getElementsByName('email')[0] as HTMLInputElement).value,
          phoneNumber: (document.getElementsByName('phoneNumber')[0] as HTMLInputElement).value,
          workingHours: (document.getElementsByName('workingHours')[0] as HTMLInputElement).value,
          profileImage: imageUrl,
          website: (document.getElementsByName('website')[0] as HTMLInputElement).value || '', // Default to empty string if not provided
          location: (document.getElementsByName('location')[0] as HTMLInputElement).value,
          providerType,
          services: (document.getElementsByName('services')[0] as HTMLInputElement).value.split(',').map(service => service.trim()),
          userId,
        };

        try {
          const response = await axios.post('/care/newprovider', providerData, { headers });

          const providerID = response.data.providerID;
          setProviderId(providerID);
          localStorage.setItem('providerID', providerID);

          if (providerType === 'Facility') {
            setStep(2);
          } else if (providerType === 'Doctor') {
            setStep(3);
          } else {
            setStep(step + 1);
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.message;
            setErrors([errorMessage]);
          } else {
            setErrors(['An unexpected error occurred']);
          }
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
      setError((error as Error).message);
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
        const facilityData = {
          providerID: providerID!,
          facilityphotos: (e.currentTarget.elements.namedItem('facilityPhotos') as HTMLInputElement).value,
          insurance: (e.currentTarget.elements.namedItem('insurance') as HTMLInputElement).value.split(',').map(item => item.trim()),
          specialties: (e.currentTarget.elements.namedItem('specialties') as HTMLInputElement).value.split(',').map(item => item.trim()),
        };

        const facilityErrors = validateFields([
          { name: 'Facility photos', value: facilityData.facilityphotos },
          { name: 'Insurance', value: facilityData.insurance.join(', ') },
          { name: 'Specialties', value: facilityData.specialties.join(', ') },
        ]);

        if (facilityErrors.length > 0) {
          setErrors(facilityErrors);
          return;
        }

        await axios.post('/care/newfacility', facilityData, { headers });
      } else if (step === 3 && providerType === 'Doctor') {
        const doctorData = {
          providerID: providerID!,
          LanguagesSpoken: (e.currentTarget.elements.namedItem('LanguagesSpoken') as HTMLInputElement).value.split(',').map(item => item.trim()),
          Gender: (e.currentTarget.elements.namedItem('Gender') as HTMLSelectElement).value,
          specialties: (e.currentTarget.elements.namedItem('specialties') as HTMLInputElement).value.split(',').map(item => item.trim()),
          conditionsTreated: (e.currentTarget.elements.namedItem('conditionsTreated') as HTMLInputElement).value.split(',').map(item => item.trim()),
          Procedureperformed: (e.currentTarget.elements.namedItem('Procedureperformed') as HTMLInputElement).value.split(',').map(item => item.trim()),
          insurance: (e.currentTarget.elements.namedItem('insurance') as HTMLInputElement).value.split(',').map(item => item.trim()),
        };

        const doctorErrors = validateFields([
          { name: 'Languages Spoken', value: doctorData.LanguagesSpoken.join(', ') },
          { name: 'Gender', value: doctorData.Gender },
          { name: 'Specialties', value: doctorData.specialties.join(', ') },
          { name: 'Conditions Treated', value: doctorData.conditionsTreated.join(', ') },
          { name: 'Procedures Performed', value: doctorData.Procedureperformed.join(', ') },
          { name: 'Insurance', value: doctorData.insurance.join(', ') },
        ]);

        if (doctorErrors.length > 0) {
          setErrors(doctorErrors);
          return;
        }

        await axios.post('/care/newdoctor', doctorData, { headers });
      }

      if (providerType === 'Facility' && step === 2) {
        setStep(3);
      } else if (providerType === 'Doctor' && step === 3) {
        setStep(4);
      } else {
        setStep(step + 1);
      }
    } catch (error) {
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
        <ProviderRegistration
          handleNext={handleNext}
          handleProviderTypeChange={handleProviderTypeChange}
          handleFileChange={handleFileChange}
          errors={errors}
          setErrors={setErrors}
          setProviderType={setProviderType}
          setImageFile={setImageFile}
        />
      )}
      {step === 2 && providerType === 'Facility' && (
        <FacilityRegistration
          handleBack={handleBack}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      )}
      {step === 3 && providerType === 'Doctor' && (
        <DoctorRegistration
          handleBack={handleBack}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      )}
    </div>
  );
};

export default RegistrationForm;
