// NavBar.tsx
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
// import styles from './Styles/navbar.module.css';
import UserDropdown from './Components/userDropdown';

function NavBar() {
    const currentPath = usePathname();
    const [isNavOpen, setIsNavOpen] = useState(false);
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

    const links = [
        { label: "HOME", href: "/" },
        { label: "DOCTORS", href: "/doctors" },
        { label: "HOSPITALS", href: "/facilities" },
        { label: "REGISTER", href: "/register" }
    ];

    return (
        <>
        <nav className='flex items-center justify-between mb-3 h-14'>
            <div className='flex items-center'>
                <Link href="/"><h3>Care.<span>Connect</span></h3></Link>
                <button 
                    className="lg:hidden" 
                    onClick={() => setIsNavOpen(!isNavOpen)}
                >
                    <svg
                        className="w-6 h-6 text-gray-600 hover:text-gray-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isNavOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        )}
                    </svg>
                </button>
                <ul className={`lg:flex lg:space-x-6 ml-6 ${isNavOpen ? 'block' : 'hidden lg:block'}`}>
                    {links.map(link =>
                        <li key={link.href}>
                            <Link
                                className='text-zinc-800 hover:text-zinc-500'
                                href={link.href}
                            >
                                {link.label}
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
            <div className='flex space-x-3 items-center'>
                {fullname ? (
                    <UserDropdown 
                        fullname={fullname} 
                        role={role!} 
                        handleLogout={handleLogout} 
                        isDropdownOpen={isDropdownOpen} 
                        setIsDropdownOpen={setIsDropdownOpen} 
                    />
                ) : (
                    <>
                        <Link href="/users/login">LOGIN</Link>
                        <Link href="/users/signup" className="bg-blue-500 text-white rounded-lg px-3 py-2">Get Started</Link>

                    </>
                )}
            </div>
        </nav>
        </>
    );
}

export default NavBar;
