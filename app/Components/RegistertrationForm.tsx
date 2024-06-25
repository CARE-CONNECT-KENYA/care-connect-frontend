'use client'

import React from 'react'
import { useState } from 'react'
import styles from '../Styles/RegistartionForm.module.css'


function RegistertrationForm() {

  const [step, setStep] = useState(1);

  const handleNext = async () =>{
    setStep(step + 1);

  }

 

  return (
    <div >
        {/* provider form */}
        { step === 1 && (
        <div className={styles.ProviderDetails}>
            <form  className={styles.ProvidersForm} >
                    <input type='text' placeholder='Providername'/> 
                    <input type='text' placeholder='email' />
                    <input type='number' placeholder='Phone number'/>
                    <input type='text' placeholder='Location'/>
                    <input type='text' placeholder='Website' />
                    <textarea placeholder='description' />
                    <input type='text' placeholder='Services' />
                    <input type='file' placeholder='Upload profile image' /> 
                    
                    <input list='datalist-hours' placeholder='choose working hours'/>
                    <datalist id="datalist-hours">
                        <option>MON-FRID 8:00AM - 5:00PM</option>
                        <option>MON-FRID 8:00AM - 5:00PM</option>
                    </datalist>
                
                    <select>
                        <option value="" disabled selected hidden>Choose Provider type</option>
                        <option>Facility</option>
                        <option>Doctor</option>
                    </select>
                    <button type="button" onClick={handleNext}>Next</button>
            </form>
        </div>
         )}

        {/* facility form */}
        { step === 2 && (
        <div className={styles.FacilityDetails}> 
            <form className={styles.ProvidersForm}>
                <input type='text' placeholder='insurance' />
                <input type='text' placeholder='specialties' />
                <input type='file' placeholder='facility photos'/>
                <button type="button" onClick={handleNext}>Next</button>

            </form>

        </div>
        )}
        
    

        {/* Doctors form */}
        { step === 3 && (
        
        <div className={styles.DoctorDetails}>
  
            <form className={styles.ProvidersForm}>
                <input type='text' placeholder='Languages'/>
                <select>
                    <option value="" disabled selected hidden>Doctors Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Rather Not say</option>
                </select>
                <input type='text' placeholder='specialties' />
                
                <input type="text" placeholder='conditions' />
                <input type='text' placeholder='procedures' />
                <input type='text' placeholder='insurance' />
                <button type="button" onClick={handleNext}>Submit</button>
      
            </form>

        </div>
        )}
        
    </div>
  )
}

export default RegistertrationForm