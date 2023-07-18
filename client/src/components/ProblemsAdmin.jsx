import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProblemsAdmin = () => {
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

    const handleDelete = async (problemId)=>{
      await axios.delete(`http://localhost:3001/deleteQues/${problemId}`)

      window.location.reload();
    }
        
        return (
            <div className='allProblems bg-blue-900'>
            <table className="min-w-full divide-y divide-gray-200">
            <tbody>
    
            <tr>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Acceptance</th>
                <th className='w-14'></th>
                <th className='w-14'></th>
              </tr>
            {problemArr.map((curr,index)=>{
                var i = "color"+index%2;
                

                return(
    
         <tr className={`border-solid border-black text-slate-200 ${i} hover:bg-slate-500 hover:cursor-pointer delay-200`} key={index}>
            <td>
                {curr.title}
            </td>
            <td>
                {curr.acceptance}
            </td>
            <td className={`${curr.difficulty}`}>
                {curr.difficulty}
            </td>
            <td className='hover:text-black hover:scale-110 delay-100'>
            <Link to={`/updateQues/${curr.problemId}`}>
              Edit
            </Link>
            </td>
            <td className='hover:text-black hover:scale-110 delay-100'>
            <button onClick={()=>handleDelete(curr.problemId)}>Delete</button>
            </td>
        </tr>
                )
            })}
        </tbody>
        </table>

            <button className="bg-gray-500 hover:bg-slate-400
             block rounded mt-5 px-2 py-3 border-4 border-yellow-600 m-auto"><a href='/AddQues'>Add Problem</a></button>
            </div>
        )
}

export default ProblemsAdmin