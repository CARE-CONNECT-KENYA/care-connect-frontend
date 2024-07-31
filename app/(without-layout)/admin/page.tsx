
import React from 'react'
import styles from '../../Styles/dashbordlayout.module.css'
import ProviderAdminDetails from '../../Components/admin/ProviderAdminDetails'


function AdminProvider() {
  return (
    <>
      <div className={styles.DashbordContainer}>
        <div className={styles.DashHeader} >
          <p>Name</p>
          <input type='text' placeholder='search'/>
          <p>Heading</p>
          
          
        </div>
        <div className={styles.DashContainer}>
          <div className={styles.DashbordSidebar}>
            <ul>
              <li>Home </li>
              <li> Settings</li>
              <li>Admin</li>
              <li> Calender </li>
            </ul>

          </div>

          <div className={styles.DashbordMainArea}>
            <ProviderAdminDetails />


          </div>

        </div>
      </div>
    </>
  )
}

export default AdminProvider