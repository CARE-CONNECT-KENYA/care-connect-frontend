
'use client'
import React from 'react';
import styles from './login.module.css';
import LoginForm from '@/app/Components/LoginForm';

import React from 'react'
import RootLayout from '@/app/layout'


function Userlogin() {
  const handleLoginSuccess = (data) => {
    // Handle successful login if needed
    console.log('Login successful:', data);
  };

  return (
    <div className={styles.signupPage}>
      {/* Side containing the form */}
      <div className={styles.formComponent}>
        {/* Pass handleLoginSuccess as onSuccess prop */}
        <LoginForm onSuccess={handleLoginSuccess} />
      </div>
      {/* Side containing the image */}
      <div className={styles.SignupSidebar}>
        <div className={styles.topPart}>
          <h3>Welcome</h3>
          <div className={styles.line}></div>
        </div>
        <div className={styles.bottomPart}>
          <h1>SIGN UP</h1>
        </div>
      </div>
    </div>
  );
}

export default Userlogin;
