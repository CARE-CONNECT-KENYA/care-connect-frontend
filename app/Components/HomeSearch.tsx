import React from 'react'
import styles from "./HomePage.module.css"

function HomeSearch() {
  return (
    <div className={styles.searchContainer} >
        <div className='flex gap-10 justify-center'>
            <div>
                <img src='/images/care-connect-hero-image.jpg' alt='Sick person image'/>
            </div>
            <div>
                <h1>Get your health straight</h1>
                <p>Search for the best facility and the most accesible to nature you back to health </p>
                <input  placeholder="Find your doctor"/>

            </div>
        </div>
    </div>
  )
}

export default HomeSearch