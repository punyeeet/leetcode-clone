import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE } from './helper';

export const Signup = () => {
    const [log,setLog] = useState({name:"",username:"",password:""});

    const handleformChange = (e)=>{
        setLog((prev)=>({...prev, [e.target.name]:e.target.value}));
    }

    const navigate = useNavigate()

    const handleSubmit = async e=>{
        e.preventDefault()
        try{    
            await axios.post(`${BASE}/signup`,log)
            .then(async res=>{
                alert(res.data.msg) 
                navigate('/login')
            }
            )
            .catch(err=>{
                if(err.response.status===400){
                    alert("Error Creating new User")
                }else if(err.response.status===401){
                    
                    alert("User Already exists");
                }else{
                    alert("Failed to create new user. Unexpected Error!")
                }
                console.log(err)
            });
            
            

            //force reload the page to re render all components with new user information
            window.location.reload();
            
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
                            <input placeholder="Full Name" name='name' onChange={handleformChange}
                            ></input>
                            <input placeholder="Email" name='username' onChange={handleformChange}
                            ></input>
                            <input placeholder="Password" name='password' onChange={handleformChange}></input>
                            <button type="submit" className="login-btn text-white hover:text-gray-300" onClick={handleSubmit}>
                                SignUp
                            </button>
                        </form>
                        <p className="text-center">
                        Have an account? <a href='/login' className='hover:text-blue-600'>Login</a>
                        </p>
                        {/* <Switch>
                            <Route path="/singup">
                                <Signup/>
                            </Route>
                        </Switch> */}

                    </div>
                        
                </div>
            </div>
        </>
    )
}
