import React from 'react'
import styles from '../../Styles/dashbordlayout.module.css';


function SideBar() {
  return (
    <>
    <div className={styles.DashbordSidebar}>
          <ul>
            <li>Home</li>
            <li>Users</li>
            <li>Providers</li>
          </ul>
        </div>
    </>
  )
}

export default SideBar
