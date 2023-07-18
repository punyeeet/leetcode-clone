import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = (props) => {
    const navigate = useNavigate();
    const {Component} = props;
    
    useEffect(()=>{
        const user = localStorage.getItem('user');
        
        if(user){
            navigate('/');
        }
    });
  return (
    <Component/>
  )
}

export default Redirect