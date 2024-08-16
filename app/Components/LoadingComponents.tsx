import React from 'react'
import styles from '../Styles/Loading.module.css'

function LoadingComponents() {
  return (
    <div className={styles.LoaderContainer}>
        <div>
            <div className={styles.loader}></div>
            <h3>FINDING THE BEST FOR YOU</h3>
            
        </div>
    </div>
  )
}

export default LoadingComponents
