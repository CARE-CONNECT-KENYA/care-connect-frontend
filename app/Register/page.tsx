import React from 'react'
import styles from "../Styles/RegistartionForm.module.css"

function page() {
  return (
    <div className={styles.RegistartionConatiner}>
        <div>
            <form className={styles.ProvidersForm}>
                <input type='text' placeholder='Providername' /> 
                <input type='text' placeholder='email' />
                <input type='number' placeholder='Phone number'/>
                <input type='text' placeholder='Location'/>
                <input type='text' placeholder='Website' />
                <textarea placeholder='description' />
                <input type='file' placeholder='Upload profile image' /> 
                <input type='text' placeholder='Services' />
                <label>Select Working Hours</label>
                <select>
                    <option>Mon - Friday 8:00AM - 5PM</option>
                </select>
            </form>
        </div>
        <div>
            <h1>Benefits of registration</h1>
        </div>
      
    </div>
  )
}

export default page
