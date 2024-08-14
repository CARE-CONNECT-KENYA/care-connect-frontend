import React from 'react'
import styles from "../Styles/HomePage.module.css"
import Link from 'next/link'
import Image from 'next/image'

function HomeRegister() {
  return (
    <div className={styles.registertext}>
        <div>
            <Image 
                src='/images/registerfacility.png'
                alt='registration-care-connect-cat'
                width={700}
                height={700}
            />
            
        </div>

        <div className={styles.description} >
            <div>
                <h1>
                Do you offer Quality <br></br>Reliable & Top-class <br></br>healthcare services.
                </h1>
            </div>
            
            <div className=' flex gap-3 mt-10'>
                <Link className={styles.facilitybtn} href="/register" ><button>Get Started Here</button></Link>
            </div>

        </div>
    </div>
  )
}

export default HomeRegister