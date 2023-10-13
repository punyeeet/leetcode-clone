import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BASE , Auth} from './helper';
import {FaArrowsUpDown} from 'react-icons/fa6'



const Problems = () => {
    const [problemArr,setproblemArr] = useState([])
useEffect(()=>{
  const fetchQues = async ()=>{
    try{
      const res = await axios.get(`${BASE}/questions`)
      setproblemArr(res.data.problems);
    }catch(err){
      console.log(err);
    }
  }
  fetchQues()
},[])

const [asc,setAsc] = useState(false);

const sortDifficulty = ()=>{
  setAsc(!asc)
  const temp = [...problemArr]
  temp.sort((a, b) => asc ? b.acceptance - a.acceptance:a.acceptance-b.acceptance)
  setproblemArr(temp)  
}

    
    return (
        <div className='allProblems'>
        <table className="min-w-full divide-y divide-gray-200">
        <tbody>

        <tr>
            <th>Title</th>
            <th ><span onClick={sortDifficulty} className='cursor-pointer hover:text-gray-400'> <FaArrowsUpDown className='inline '/> Acceptance</span></th>
            <th>Difficulty</th>
          </tr>
        {problemArr.map((curr,index)=>{
            var i = "color"+index%2;
            
            return(
              
              
     <tr className={`border-solid border-black text-slate-200 ${i} `} key={index}>
        <td>
        <Link to={`/question/${curr.problemId}`} className='hover:text-blue-700  hover:cursor-pointer'>
            {curr.title}
        </Link>
        </td>

        <td>
            {curr.acceptance}
        </td>
        <td className={`${curr.difficulty}`}>
            {curr.difficulty}
        </td>
    </tr>
              
            )
        })}
    </tbody>
    </table>
        </div>
    )
}

export default Problems