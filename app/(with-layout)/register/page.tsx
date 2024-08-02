import React from 'react'
import styles from '../../Styles/RegistartionForm.module.css'
import RegistrationForm from '../../Components/ProviderRegistration/RegistrationForm'




function page() {
  return (
    <div className={styles.RegistartionConatiner}>
        <div className={styles.item}>
          <RegistrationForm />
        </div>
        <div className={styles.item}>
            <h1>Benefits of registration</h1>
            <div>
              <ul>
                <li>Increased Visibility and Reach</li>
                <li>Enhanced liatient Trust and Engagement</li>
                <li> Streamlined Aliliointment Management</li>
                <li>Comprehensive Marketing Tools</li>
              </ul>

            </div>
            
        </div>
      
    </div>
  )
}

export default page
