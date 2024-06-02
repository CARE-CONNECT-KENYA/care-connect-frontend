import React from 'react'
import styles from '../Styles/ProviderCard.module.css'

function ProvidersCard() {
  return (
    <div>
        <div className={styles.CardContainer}>
            <div>
                {/* Image and provider tag */}
                <img src='/images/doctors.jpg'  alt='provider card image'/>
                <h4>Facility</h4>
            </div>
            <div className={styles.contentArea}>

               {/* Provider details */}
                <h1>Dr Diana Oigara</h1>
                <p><span> Specialties :</span> Specialty1 | Specialty2 | speciaty3 </p>
                <p>Rating</p>
                <p>Dr. Vellek is amazing! He and his staff are intelligent, efficient and compassionate. I feel very confident in his experience and knowledge.
                     He is a straight shooter and tells you</p>

                <div className={styles.callToAction}>
                    <button type='submit'> Know More </button>
                </div>
          
            </div>
        </div>
    </div>
  )
}

export default ProvidersCard
