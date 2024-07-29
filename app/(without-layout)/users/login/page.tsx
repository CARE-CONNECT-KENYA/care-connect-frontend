'use client'

import React from 'react';
import styles from '../signup/signup.module.css';
import Link from 'next/link';
import LoginForm from '../../../Components/LoginForm';



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
          <div className={styles.navigationOption}>
              <p> I dont have an account </p>
              <Link href='/users/signup'> SIGN UP </Link>
            </div>
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
    
  );
}

export default Userlogin;
