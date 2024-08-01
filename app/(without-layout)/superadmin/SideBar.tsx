import React from 'react'
import styles from '../../Styles/dashbordlayout.module.css';


function SideBar() {
  return (
    <>
    <div className={styles.DashbordSidebar}>
          <ul>
            <li>Home</li>
            <li>Settings</li>
            <li>Admin</li>
            <li>Calendar</li>
          </ul>
        </div>
    </>
  )
}

export default SideBar
