'use client'
import React, { useEffect, useState } from 'react';
import styles from '../../Styles/dashbordlayout.module.css';
import UserDropdown from '../../Components/userDropdown';
import Approveapplications from '../../Components/SuperadminComponents/Approveapplications'

function SuperAdmin() {
  const [fullname, setFullname] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedFullname = localStorage.getItem('fullname');
    const storedRole = localStorage.getItem('role');
    if (storedFullname) {
      setFullname(storedFullname);
    }
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('fullname');
    localStorage.removeItem('role');
    window.location.href = '/users/login'; // Redirect to login page after logout
  };

  return (
    <div className={styles.DashbordContainer}>
      <div className={styles.DashHeader}>
        <p>Name</p>
        <input type='text' placeholder='search'/>
        {fullname && role && (
          <UserDropdown 
            fullname={fullname} 
            role={role} 
            handleLogout={handleLogout} 
            isDropdownOpen={isDropdownOpen} 
            setIsDropdownOpen={setIsDropdownOpen} 
          />
        )}
      </div>
      <div className={styles.DashContainer}>
        <div className={styles.DashbordSidebar}>
          <ul>
            <li>Home</li>
            <li>Settings</li>
            <li>Admin</li>
            <li>Calendar</li>
          </ul>
        </div>
        <div className={styles.DashbordMainArea}>
          <Approveapplications />
        </div>
      </div>
    </div>
  )
}

export default SuperAdmin