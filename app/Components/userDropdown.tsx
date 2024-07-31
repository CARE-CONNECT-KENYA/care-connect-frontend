// UserDropdown.tsx
'use client'

import Link from 'next/link';
import React from 'react';
import styles  from '../Styles/navbar.module.css'

interface UserDropdownProps {
    fullname: string;
    role: string;
    handleLogout: () => void;
    isDropdownOpen: boolean;
    setIsDropdownOpen: (open: boolean) => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ fullname, role, handleLogout, isDropdownOpen, setIsDropdownOpen }) => {
    const getInitial = (name: string) => name.charAt(0).toUpperCase();

    return (
        <div className='relative'>
            <div className='flex items-center cursor-pointer' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <div className={styles.avatar}>{getInitial(fullname)}</div>
                <p className='text-lg ml-2'>{fullname}</p>
                <svg className="w-4 h-4 ml-1 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            {isDropdownOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg'>
                    {role === 'admin' && (
                        <Link href="/admin" className='w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 block'>
                            Dashboard
                        </Link>
                    )}
                    {role === 'super_admin' && (
                        <Link href="/superadmin" className='w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 block'>
                            Manage Providers
                        </Link>
                    )}
                    <button className='w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200' onClick={handleLogout}>
                        Logout
                    </button>
                    <Link href='/' className='w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 block'>
                     Home </Link>
                </div>
            )}
        </div>
    );
}

export default UserDropdown;
