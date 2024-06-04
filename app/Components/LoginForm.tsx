'use client'
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../Styles/Users.module.css';

interface LoginFormProps {
  onSuccess: (data: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/care/login', { email, password });
      const data = response.data;
      // Store items in localStorage
      localStorage.setItem('fullname', data.fullname);
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('role', data.role);
      // Trigger success callback
      onSuccess(data);
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.Signupform} >
      <div >
        <h6>Email</h6>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <h6>Password</h6>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
