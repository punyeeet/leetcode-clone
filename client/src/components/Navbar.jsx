import React from 'react'
import { useLocation } from 'react-router-dom'
import { FaArrowRightFromBracket } from "react-icons/fa6";

export const Navbar = () => {
        const logOut =  ()=>{
            localStorage.removeItem('user')
            localStorage.removeItem('auth')
        }
        const location = useLocation();
        
    return(
        <>
            
            <nav className='bg-zinc-700 text-white fixed top-0 w-full overflow-clip flex items-center justify-between'>
                {
                    localStorage.getItem('user')===null ? (
                        <ul className='navitem flex  w-full gap-5 '>
                        <li className={`${location.pathname === '/' ? 'active' : ''}`}><a href='/' >Home</a></li>
                        <li className={location.pathname === '/problemset/all' ? 'active' : ''}><a href='/problemset/all' >Problems</a></li>
                        <li className={`${location.pathname === '/login' ? 'active' : ''} ml-auto`}><a href='/login' >Login</a></li>
                        <li className={location.pathname === '/signup' ? 'active' : ''}><a href='/signup' >Signup</a></li>
                        </ul>
                ):(
                    <ul className='navitem flex  w-full '>
                        <li className={location.pathname === '/' ? 'active' : ''}><a href='/' >Home</a></li>
                        <li className={location.pathname === '/problemset/all' ? 'active' : ''}><a href='/problemset/all' >Problems</a></li>
                        <li className='ml-auto mr-2 hover:'><a href='/' onClick={logOut} title='Logout'><FaArrowRightFromBracket size={25}/></a></li>
                    </ul>
                )
                }
                
            </nav>
        </>
    )
}
