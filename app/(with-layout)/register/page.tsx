import React from 'react'
import styles from '../../Styles/RegistartionForm.module.css'
import RegistrationForm from '../../Components/ProviderRegistration/RegistrationForm'
import Benefits from '../../Components/Registarion/Benefits'
import RegistrationHeader from '../../Components/Registarion/RegistrationHeader'




function page() {
  return (
    <>
    <RegistrationHeader />
    <div className={styles.RegistartionConatiner}>
        <div className={styles.item}>
          <RegistrationForm />
        </div>
        <Benefits />
      </div>
    </>
  )
}

export default page
