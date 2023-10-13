import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginContext from '../context/LoginContext';
import {Axios , BASE} from './helper.js'

const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const { user , setUser} = useContext(LoginContext)

  useEffect(() => {
    const logOut = () => {
      
      const logOutUser = async () => {
        await Axios.get(`${BASE}/logout`)
          .then(res => {
            console.log(res);
          })
      }
      logOutUser();
      setUser(null);
    }

    console.log(user)
    if (!user || !user.user.admin){
      logOut();
      if(!user)
        alert("Unauthorized to Update Questions! Please Login with Admin permissions.")
      else if(!user.user.admin)
        alert("couldn't verify admin");
      
      navigate('/login');
    }

  });

  return (
    <div>
      <Component />
    </div>
  )
}

export default Protected