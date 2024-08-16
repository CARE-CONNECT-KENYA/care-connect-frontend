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
          <p>Fill in the for Below to setup(an accout is required) </p>

          <RegistrationForm />
        </div>
        <Benefits />
      </div>
    </>
  )
}

export default page
