'use client'
// components/DoctorRegistration.tsx
import React, { FormEvent } from 'react';
import styles from '../../Styles/RegistartionForm.module.css';

interface DoctorData {
  providerID: string;
  LanguagesSpoken: string[];
  Gender: string;
  specialties: string[];
  conditionsTreated: string[];
  Procedureperformed: string[];
  insurance: string[];
}

interface Props {
  handleBack: () => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  errors: string[];
}

const DoctorRegistration: React.FC<Props> = ({ handleBack, handleSubmit, errors }) => {
  return (
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
          <p className={styles.Error}>{errors.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default DoctorRegistration;
