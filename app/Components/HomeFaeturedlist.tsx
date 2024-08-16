import React from 'react'
import styles from "../Styles/HomePage.module.css"
import FeaturedProviders from './FeaturedProviders'
import LoadingComponents from './LoadingComponents'

function HomeFaeturedlist() {
  return (
    <div>
        <div className={styles.featuredList}>

          <h1>
            <span >Featured</span> Service Providers
          </h1>

        </div>

        <div>
            <FeaturedProviders />
       
        </div>
    </div>
  )
}

export default HomeFaeturedlist