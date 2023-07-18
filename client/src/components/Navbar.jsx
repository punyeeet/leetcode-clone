import React from 'react'
import { useLocation } from 'react-router-dom'

export const Navbar = () => {
        const logOut =  ()=>{
            localStorage.removeItem('user')
            localStorage.removeItem('auth')
        }
        const location = useLocation();

    return(
        <>
            
            <nav className='bg-zinc-700 text-white fixed top-0 w-full overflow-clip'>
                {
                    localStorage.getItem('user')===null ? (
                        <ul className='navitem flex space-x-4 '>
                        <li className={`${location.pathname === '/' ? 'active' : ''}`}><a href='/' >Home</a></li>
                        <li className={location.pathname === '/problemset/all' ? 'active' : ''}><a href='/problemset/all' >Problems</a></li>
                        <li className={`${location.pathname === '/login' ? 'active' : ''} mr-0`}><a href='/login' >Login</a></li>
                        <li className={location.pathname === '/signup' ? 'active' : ''}><a href='/signup' >Signup</a></li>
                        </ul>
                ):(
                    <ul className='navitem flex space-x-4'>
                        <li className={location.pathname === '/' ? 'active' : ''}><a href='/' >Home</a></li>
                        <li className={location.pathname === '/problemset/all' ? 'active' : ''}><a href='/problemset/all' >Problems</a></li>
                        <li><a href='/' onClick={logOut}>Logout</a></li>
                    </ul>
                )
                }
                
            </nav>
        </>
    )
}
