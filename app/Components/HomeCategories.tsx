import React from 'react'
import styles from "./HomePage.module.css"

function HomeCategories() {
  return (
    <div className={styles.categories}>
        <div className={styles.caption}>
            <h1 className={styles.categoryheader}>
                Discover the  Premier <br></br>
                Online Medical Center 
            </h1>
            <p>
                Where 100% Care Meets Cutting-Edge Expertise!
            </p> 
        </div>
        <div className={styles.categorylist}>
            <ul className={styles.categorylist}>
                <li>
                    PRIMARY CARE
                </li>
                <li>
                    DENTIST
                </li>
                <li>
                    DERMERTOLIGIST
                </li>
                <li>
                    EYE DOCTOR
                </li>
                <li>
                   PEDETRICIAN
                </li>
            </ul>

        </div>
    </div>
  )
}

export default HomeCategories