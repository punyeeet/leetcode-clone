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

// const logOut =  ()=>{
//     const {setUser} = useContext(LoginContext)

//     const logOutUser= async ()=> {
//         await Axios.get(`${BASE}/logout`)
//         .then(res=>{
//             console.log(res);
//         })
//     }
//     logOutUser();
//     setUser(null);
// }

const BASE = 'http://localhost:3001'

export { BASE, Auth ,Axios}