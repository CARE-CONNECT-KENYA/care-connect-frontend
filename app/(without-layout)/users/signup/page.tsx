
import React from 'react'
import Link from 'next/link'
import styles from './signup.module.css'
import SignUpForm from '../../../Components/SignUpForm'


function UserSignup() {
  return (
    
   
       <div className={styles.signupPage}>
        {/* Side containing the form */}
        <div className={styles.formComponent}>
             <SignUpForm />
             <div className={styles.navigationOption}>
              <p> I have an account </p>
              <Link href='/users/login'> LOGIN </Link>
             </div>
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
  

  )
}

export default UserSignup