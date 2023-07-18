import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Problems = () => {
    const [problemArr,setproblemArr] = useState([])
useEffect(()=>{
  const fetchQues = async ()=>{
    try{
      const res = await axios.get("http://localhost:3001/questions")
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
        <div className='allProblems bg-black'>
        <table className="min-w-full divide-y divide-gray-200">
        <tbody>

        <tr>
            <th>Title</th>
            <th ><button onClick={sortDifficulty} className='hover:text-gray-500'> {asc ? 'low->high':'high->low'} Acceptance</button></th>
            <th>Difficulty</th>
          </tr>
        {problemArr.map((curr,index)=>{
            var i = "color"+index%2;
            
            return(
              
              
     <tr className={`border-solid border-black text-slate-200 ${i} hover:bg-slate-500 `} key={index}>
        <td>
        <Link to={`/question/${curr.problemId}`} className='hover:text-black hover:cursor-pointer'>
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