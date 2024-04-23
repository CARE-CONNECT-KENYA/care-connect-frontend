import Link from 'next/link'
import React from 'react'

function NavBar() {
  return (
    <nav className='flex space-x-6 mb-10 h14' >
        <Link href="/">Logo</Link>
        <ul className='flex space-x-6 items-center'>
            <li><Link href="/"> Home</Link></li>
            <li><Link href="/"> Doctors</Link></li>
            <li><Link href="/"> Facilities </Link></li>
            <li><Link href="/"> Categories </Link></li>

            <li><Link href="/"> Login</Link></li>
            <li><Link href="/"> Sign Up</Link></li>
        </ul>
    </nav>
  )
}

export default NavBar