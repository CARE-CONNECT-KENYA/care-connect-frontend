'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

// Existing imports and code...

function NavBar() {
    const currentPath = usePathname();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const links = [
        { label: "HOME", href: "/" },
        { label: "DOCTORS", href: "/" },
        { label: "FACILITIES", href: "/" },
        { label: "CATEGORIES", href: "/" },
    ];

    return (
        <nav className='flex items-center justify-between mb-3 h-14'>
            <div className='flex items-center'>
                <Link href="/"><h3>Care.<span>Connect</span></h3></Link>
                {/* Display a button to toggle the navigation on mobile */}
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
                {/* Navigation links */}
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
            <div className='flex space-x-6'>
                <Link href="/">LOGIN</Link>
                <Link href="/">SIGN UP</Link>
            </div>
        </nav>
    );
}

export default NavBar;

