'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function NavBar() {
    const currentPath = usePathname();

    const links = [
        { label: "HOME", href: "/" },
        { label: "DOCTORS", href: "/" },
        { label: "FACILITIES", href: "/" },
        { label: "CATEGORIES", href: "/" },
    ];

    return (
        <nav className='flex items-center justify-between mb-3 h-14'>
            <div className='flex items-center'>
                <Link href="/"><h1>Care.<span>Connect</span></h1></Link>
                <ul className='flex space-x-6 ml-6'>
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
