'use client'
import React, { useEffect, useState } from 'react';
import UserDropdown from '../../Components/userDropdown';

import styles from '../../Styles/dashbordlayout.module.css';

function TopBar() {

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
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('providerID');
      window.location.href = '/users/login'; // Redirect to login page after logout
    };
  
  return (
    <>
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
    </>
  )
}

export default TopBar
