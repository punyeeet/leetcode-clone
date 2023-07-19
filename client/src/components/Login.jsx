import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE } from './helper';




export const Login = () => {
    const [log,setLog] = useState({username:"",password:""});
    const navigate = useNavigate();

    const handleformChange = (e)=>{
        setLog((prev)=>({...prev, [e.target.name]:e.target.value}));
        // console.log(log);
    }

    const handleSubmit = async e=>{
        e.preventDefault()
        try{    
            await axios.post(`${BASE}/login`,log)
            .then(res=>{
                localStorage.setItem('user',JSON.stringify(res.data.user));
                localStorage.setItem('auth',JSON.stringify(res.data.token));
            }
            )
            .catch(err=>{
                if(err.response.status===401){
                    alert("Password and Email do not match")
                }else {
                    alert("User does not exist");
                }
            });
            
            

            //force reload the page to re render all components with new user information
            navigate('/');

        }catch(err){
            console.log(err);
        }

    }

    


    return (
        <>
            <div className="flex items-center justify-center bg-gray-200 h-screen w-screen">
                <div className="h-screen w-1/4 bg-white py-3.5">
                    <div className="justify-center  items-center">
                        <img src="https://assets.leetcode.com/static_assets/public/webpack_bundles/images/logo.c36eaf5e6.svg" className="block m-auto py-10 "/>
                        <form className=" login-input">
                            <input placeholder="Email" name='username' onChange={handleformChange}
                            ></input>
                            <input placeholder="Password" type='password' name='password' onChange={handleformChange}></input>
                            <button type="submit" className="login-btn text-white hover:text-gray-300" onClick={handleSubmit}>
                                Login
                            </button>
                        </form>
                        <p className="text-center">
                        Don't have an account? <a href='/signup' className='hover:text-blue-600'>Signup</a>
                        </p>
                        

                    </div>
                        
                </div>
            </div>
        </>
    )
}
