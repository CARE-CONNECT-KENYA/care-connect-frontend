'use client'
import React, { useState } from 'react';
import styles from '../../Styles/dashbordlayout.module.css';
import { FaBars, FaTimes, FaHome, FaUser, FaUserMd } from 'react-icons/fa'; // Import icons

function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${styles.DashbordSidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarToggle} onClick={toggleSidebar}>
        {isCollapsed ? <FaBars /> : <FaTimes />}
      </div>
      <ul>
        <li>
          <FaHome className={styles.sidebarIcon} />
          {!isCollapsed && <span>Home</span>}
        </li>
        <li>
          <FaUser className={styles.sidebarIcon} />
          {!isCollapsed && <span>Users</span>}
        </li>
        <li>
          <FaUserMd className={styles.sidebarIcon} />
          {!isCollapsed && <span>Providers</span>}
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
