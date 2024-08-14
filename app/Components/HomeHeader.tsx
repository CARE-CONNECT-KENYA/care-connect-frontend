import React from 'react'
import styles from "../Styles/HomePage.module.css"
import HomepageCategories from './HomepageCategories'


function HomeHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.HeaderText}>
        <p>You deserve access to quality Health care</p>
        <h1>Find the right Doctor or Hospital</h1>
      </div>
      <HomepageCategories />
      
    </div>
  )
}

export default HomeHeader