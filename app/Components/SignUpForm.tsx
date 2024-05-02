import React from 'react'
import styles from '../Styles/Users.module.css'

function SignUpForm() {
  return (
    <div>
        <div className={styles.Signupform}>
            <h3>Email</h3>
            <input type='text' placeholder='enter email' />

            <h3>Password</h3>
            <input type="text" placeholder='enter password'/>
            <button type='submit'>Sign Up</button>
        
        </div>
        <div className='flex gap-3 mt-10'>

            <div className={styles.line}></div>
            <div className='mt-n10'><h3>OR</h3></div>
            <div className={styles.line}></div>

        </div>
    </div>
  )
}

export default SignUpForm
