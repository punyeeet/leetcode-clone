// export const BASE = 'https://leetcode-backend-kxbv.onrender.com'
import axios from "axios"
// import { useContext } from "react";
// import LoginContext from "../context/LoginContext";

const Axios = axios.create({
    withCredentials: true
});

const Auth = async () => {

    // try{
    //   const res = await axios.get(`${BASE}/auth`)
    //   setUser(res.user);
    // }catch(err){
    //   console.log(err);
    // }

    

}



const BASE = 'https://leetcode-backend-kxbv.onrender.com'

export { BASE, Auth ,Axios}