import React from 'react'
import styles from '../../Styles/RegistartionForm.module.css'
import RegistrationForm from '../../Components/RegistertrationForm'




function page() {
  return (
    <div className={styles.RegistartionConatiner}>
        <div className={styles.item}>
          <RegistrationForm/>
            
            
        </div>
        <div className={styles.item}>
            <h1>Benefits of registration</h1>
        </div>
      
    </div>
  )
}

export default page
