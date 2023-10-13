import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { Signup } from './components/Sigup';
import ProblemsAdmin from './components/ProblemsAdmin';
import Home from './components/Home';
import Problems from './components/Problems';
import Question from './components/Question';
import AddQues from './components/AddQues';
import UpdateQues from './components/UpdateQues';
import Protected from './components/Protected';
import Redirect from './components/Redirect';
import LoginContextProvider from './context/LoginContextProvider';
import LoginContext from './context/LoginContext';
import { useContext, useEffect } from 'react';
import { Axios,BASE } from './components/helper';



function App() {

    /* Add routing here, routes look like -
       /login - Login page
       /signup - Signup page
       /problemset/all/ - All problems (see problems array above)
       /problems/:problem_slug - A single problem page
     */

    // var k=JSON.parse(localStorage.getItem('user'));
    const {user,setUser} = useContext(LoginContext)
    const isAdmin = user ? user.user.admin:null;
    useEffect(()=>{
        const Auth= async ()=> {
            await Axios.get(`${BASE}/auth`)
        .then(res => {
            setUser(res.data.user);
        }).catch(err => {
            setUser(null);
            console.log(err,"Error in Auth ");
        })  
        }
        Auth();
        // console.log("rerenderd at",new Date().toLocaleTimeString([], { timeStyle: "medium" }))
    },[])
    return (
        <>
        <BrowserRouter>
            <Navbar/>
            <Routes>
                
                <Route path='/' element={<Home/>}/>

                <Route path='/login' element={<Redirect Component={Login}/>}/>
                
                <Route path='/signup' element={<Redirect Component={Signup}/>}/>
                {/* <Route path='/problemset/all' element={<Problems />}/> */}
                <Route path='/problemset/all' element={user && isAdmin ? <ProblemsAdmin />:<Problems />}/>
                
                <Route path='/question/:id' element={<Question/>}/>

                <Route path='/AddQues' element={<Protected Component={AddQues} />}/>
                
                <Route path='/UpdateQues/:id' element={<Protected Component={UpdateQues} />}/>
            </Routes>

        </BrowserRouter>

    
        </>
  )
}






export default App
