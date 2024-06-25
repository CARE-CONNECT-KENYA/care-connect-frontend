'use client'
import React from 'react'
import styles from '../Styles/RegistartionForm.module.css'


function RegistertrationForm() {
  return (
    <div >
        {/* provider form */}
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
                    <label>Choose procider type</label>
                    <select>
                        <option>Facility</option>
                        <option>Doctor</option>
                    </select>
            </form>
        </div>

        {/* facility form */}
        <div className={styles.FacilityDetails}> 
            <form className={styles.ProvidersForm}>
                <input type='text' placeholder='insurance' />
                <input type='text' placeholder='specialties' />
                <input type='file' placeholder='facility photos'/>

            </form>

        </div>
        

        {/* Doctors form */}
        <div className={styles.DoctorDetails}>
            <form className={styles.ProvidersForm}>
                <input type='text' placeholder='specialties' />
                <input type='text' placeholder='Languages'/>
                <input type="text" placeholder='conditions' />
                <input type='text' placeholder='procedures' />
                <input type='text' placeholder='insurance' />
                <label>
                    Gender
                </label>
                <select>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Rather Not say</option>
                </select>

            </form>

        </div>
        
    </div>
  )
}

export default RegistertrationForm