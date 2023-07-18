import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
    const {Component} = props;
    const navigate = useNavigate();

    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem('user'));

        if(!user || user.admin===false){
            navigate('/login');
        }
        
    });

  return (
    <div>
        <Component/>
    </div>
  )
}

export default Protected