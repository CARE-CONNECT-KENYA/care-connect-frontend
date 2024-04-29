import React from 'react'
import styles from "../Styles/HomePage.module.css"
import Link from 'next/link'

function HomeRegister() {
  return (
    <div className={styles.registertext}>
        <div>
            <img src='/images/reg-calltoation.png'  alt='registration-care-connect-cat'/>
        </div>

        <div className={styles.description} >
            <div>
                <h1>
                Do you offer Quality <br></br>Reliable & Top-class <br></br>healthcare services.
                </h1>
            </div>
            
            <div className=' flex gap-3 mt-10'>
                <Link className={styles.facilitybtn} href="/" ><button>Register Facility</button></Link>
                <Link className={styles.doctorbtn}  href="/"><button>Register As a Doctor</button></Link>
            </div>

        </div>
    </div>
  )
}

export default HomeRegister