'use client'

import React from 'react';
import styles from '../signup/signup.module.css';
import LoginForm from '@/app/Components/LoginForm';
import NoNavFooterLayout from '@/app/NoNavFooterLayout';


function Userlogin() {
  const handleLoginSuccess = (data) => {
    // Handle successful login if needed
    console.log('Login successful:', data);
  };

  return (
   <NoNavFooterLayout> 
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
          <h1>SIGN IN</h1>
        </div>
      </div>
    </div>
    </NoNavFooterLayout> 
  );
}

export default Userlogin;
