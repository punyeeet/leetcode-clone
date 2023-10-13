import React, { useEffect , useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import LoginContext from '../context/LoginContext';

const Redirect = (props) => {
    const navigate = useNavigate();
    const {Component} = props;
    const {user} = useContext(LoginContext)
    
    useEffect(()=>{
        if(user){
            navigate('/');
        }
    });
  return (
    <Component/>
  )
}

export default Redirect