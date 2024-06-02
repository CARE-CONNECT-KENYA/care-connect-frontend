import SignUpForm from '@/app/Components/SignUpForm'
import React from 'react'
import styles from './signup.module.css'

function UserSignup() {
  return (
   
  
       <div className={styles.signupPage}>
        {/* Side containing the form */}
        <div className={styles.formComponent}>
          <SignUpForm />
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