'use client'
import React from 'react';
import styles from '../../Styles/dashbordlayout.module.css';

import ProviderAdminDetails from '../../Components/admin/ProviderAdminDetails';

import SideBar from './SideBar';
import TopBar from './TopBar';

function AdminProvider() {

  return (
    <div className={styles.DashbordContainer}>
        <TopBar/>
     
      <div className={styles.DashContainer}>
          <SideBar />
        <div className={styles.DashbordMainArea}>
          <ProviderAdminDetails />
        </div>
      </div>
    </div>
  );
}

export default AdminProvider;
