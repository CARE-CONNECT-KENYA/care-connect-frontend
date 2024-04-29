import React from 'react'
import styles from "../Styles/HomePage.module.css"

function HomeSearch() {
  return (
    <div className={styles.searchContainer} >
        <div className={styles.sercContent} >
            <div>
                <img src='/images/sickpatientcare-connect.png' alt='Sick person image'/>
            </div>
            <div>
                <h1>Get your health straight</h1>
                <p>Search for the best facility and the most accesible to nature you back to health </p>
                <input type='input' placeholder="Find your doctor"/>

            </div>
        </div>
    </div>
  )
}

export default HomeSearch