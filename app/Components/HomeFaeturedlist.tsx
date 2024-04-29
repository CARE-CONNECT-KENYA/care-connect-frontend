import React from 'react'
import styles from "../Styles/HomePage.module.css"

function HomeFaeturedlist() {
  return (
    <div>
        <div className={styles.featuredList}>

          <h1>
            <span >Top Health</span> Service Providers
          </h1>

        </div>

        <div>
            {/* Add the fetched cards from another component */}
        </div>
    </div>
  )
}

export default HomeFaeturedlist