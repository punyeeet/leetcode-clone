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


function App() {

    /* Add routing here, routes look like -
       /login - Login page
       /signup - Signup page
       /problemset/all/ - All problems (see problems array above)
       /problems/:problem_slug - A single problem page
     */

    var k=JSON.parse(localStorage.getItem('user'));

    return (
        <>
    <BrowserRouter>
        <Navbar/>
        <Routes>
            
            <Route path='/' element={<Home/>}/>

            <Route path='/login' element={<Redirect Component={Login}/>}/>
            
            <Route path='/signup' element={<Redirect Component={Signup}/>}/>
            {/* <Route path='/problemset/all' element={<Problems />}/> */}
            <Route path='/problemset/all' element={k && k.admin ? <ProblemsAdmin />:<Problems />}/>
            
            <Route path='/question/:id' element={<Question/>}/>

            <Route path='/AddQues' element={<Protected Component={AddQues}/>}/>
            
            <Route path='/UpdateQues/:id' element={<Protected Component={UpdateQues}/>}/>
        </Routes>

    </BrowserRouter>
        </>
  )
}

// A demo component
function ProblemStatement(props) {
    const title = props.title;
    const acceptance = props.acceptance;
    const difficulty = props.difficulty;

    return <tr>
        <td>
            {title}
        </td>
        <td>
            {acceptance}
        </td>
        <td>
            {difficulty}
        </td>
    </tr>
}





export default App
