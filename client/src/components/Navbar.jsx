import React, { useEffect,useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Auth,BASE,Axios } from './helper';
import LoginContext from '../context/LoginContext';


export const Navbar = () => {
        const {user} = useContext(LoginContext)

//         useEffect(()=>{
//             const Auth= async ()=> {
//                 await Axios.get(`${BASE}/auth`)
//             .then(res => {
//                 setUser(res.data.user);
//             }).catch(err => {
//                 setUser(null);
//             })  
//             }
//             Auth();
//             console.log("rerenderd at",new Date().toLocaleTimeString([], { timeStyle: "medium" }))
// },[])
        

        const logOut =  ()=>{
            const logOutUser= async ()=> {
                await Axios.get(`${BASE}/logout`)
                .then(res=>{
                    console.log(res);
                })
            }
            logOutUser();
            setUser(null);
        }
        
        const location = useLocation();

        const handleClick = (e)=>{
            const button = e.target;
            console.log(button)
            if(!button)return;

            const calcLeft = button.offsetLeft;
            nav.style.setProperty('--left',calcLeft+'px');
        }

        
    return(
        <>
            
            <nav className='navbar text-white fixed top-0 w-full overflow-clip flex items-center justify-between z-10'>
                {
                    user===null ? (
                        <ul className='navitem flex  w-full gap-5 '>
                        <li onClick={handleClick} className={`${location.pathname === '/' ? 'active' : ''}`}><a href='/' >Home</a></li>
                        <li onClick={handleClick} className={location.pathname === '/problemset/all' ? 'active' : ''}><a href='/problemset/all' >Problems</a></li>
                        <li onClick={handleClick} className={`${location.pathname === '/login' ? 'active' : ''} ml-auto`}><a href='/login' >Login</a></li>
                        <li onClick={handleClick} className={location.pathname === '/signup' ? 'active' : ''}><a href='/signup' >Signup</a></li>
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
