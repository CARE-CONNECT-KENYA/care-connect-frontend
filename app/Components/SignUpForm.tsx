'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import styles from '../Styles/Users.module.css';

// Define types for form data and error state
interface FormData {
  fullname: string;
  email: string;
  password: string;
}

interface ErrorState {
  fullname?: string;
  email?: string;
  password?: string;
  message?: string;
}

const SignUpForm: React.FC = () => {
  // Initialize state using defined types
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<ErrorState>({});
  const [success, setSuccess] = useState<string>('');

  // Handle form input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to validate password
  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({});
    setSuccess('');

    // Validate password
    if (!validatePassword(formData.password)) {
      setError({
        password: 'Password must be at least 8 characters long and include a symbol, a capital letter, and numbers.',
      });
      return;
    }

    try {
      const response = await axios.post('/care/addusers', formData);
      if (response.status === 201) {
        setSuccess('User successfully signed up!');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.data && axiosError.response.data.error) {
          setError(axiosError.response.data.error);
        } else {
          setError({ message: 'Error signing up user. Please try again.' });
        }
      } else {
        setError({ message: 'Error signing up user. Please try again.' });
      }
    }
  };

  // JSX template
  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.Signupform}>
        <h3>Full Name</h3>
        <input
          type='text'
          name='fullname'
          placeholder='Enter full name'
          value={formData.fullname}
          onChange={handleChange}
          required
        />
        {error.fullname && <p className={styles.error}>{error.fullname}</p>}

        <h3>Email</h3>
        <input
          type='text'
          name='email'
          placeholder='Enter email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        {error.email && <p className={styles.error}>{error.email}</p>}

        <h3>Password</h3>
        <input
          type='password'
          name='password'
          placeholder='Enter password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error.password && <p className={styles.error}>{error.password}</p>}

        <button type='submit'>Sign Up</button>
      </div>
      <div className='flex gap-3 mt-10'>
        <div className={styles.line}></div>
        <div className='mt-n20'>
          <h3>OR</h3>
        </div>
        <div className={styles.line}></div>
      </div>
      {error.message && <p className={styles.error}>{error.message}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </form>
  );
};

export default SignUpForm;
