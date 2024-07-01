import React from 'react'
import styles from "../Styles/HomePage.module.css"
import FeaturedProviders from './FeaturedProviders'

function HomeFaeturedlist() {
  return (
    <div>
        <div className={styles.featuredList}>

          <h1>
            <span >Top Health</span> Service Providers
          </h1>

        </div>

        <div>
            <FeaturedProviders />
        </div>
    </div>
  )
}

export default HomeFaeturedlist