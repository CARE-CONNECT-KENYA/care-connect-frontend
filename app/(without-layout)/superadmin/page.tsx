import React from 'react';
import styles from '../../Styles/dashbordlayout.module.css';
import Approveapplications from '../../Components/SuperadminComponents/Approveapplications'
import TopBar from '../admin/TopBar';
import SideBar from './SideBar';

function SuperAdmin() {

  return (
    <div className={styles.DashbordContainer}>
        <TopBar />
      <div className={styles.DashContainer}>
          <SideBar />
        <div className={styles.DashbordMainArea}>
          <Approveapplications />
        </div>
      </div>
    </div>
  )
}

export default SuperAdmin