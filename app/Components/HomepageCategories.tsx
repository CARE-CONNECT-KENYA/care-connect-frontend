import React from 'react'
import styles from "../Styles/HomePage.module.css"
import Link from 'next/link';
import Image from 'next/image';

function HomepageCategories() {
  return (
    <>
    <div className={styles.CategoriesContainer}>
        <div className={styles.DocCategory}>
            <div>
                <h2>Doctors</h2>
                <Link href='/doctors'><p>Find a doctor</p></Link>
            </div>
            <div>
                <Image
                    src="/images/Doctoalt.png"
                    alt='Care connect doctors'
                    width={250}
                    height={150}
                    style={{objectFit: "contain"}}

                />

            </div>

        </div>
        <div className={styles.HosCategory}>
            <div>
                <h2>Hospitals</h2>
                <Link href='/facilities'><p>Find a Hospital</p></Link>
            </div>
            <div>
                <Image
                    src="/images/facility-ill.png"
                    alt='Care connect doctors'
                    width={250}
                    height={150}
                    style={{objectFit: "contain"}}

                />

            </div>
        </div>

    </div>
    </>
  )
}

export default HomepageCategories