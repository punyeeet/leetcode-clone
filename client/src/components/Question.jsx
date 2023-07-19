import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Editor from "@monaco-editor/react"
import { BASE } from './helper';

const Question = () => {
    const { id } = useParams();
    

    const [problem,setProblem] = useState({});

    useEffect(()=>{
        const fetchQues = async ()=>{
          try{
            const res = await axios.get(`${BASE}/problem/${id}`)
            setProblem(res.data.problem);
          }catch(err){
            console.log(err);
          }
        }
        fetchQues()
      },[])

  return (
    <div className='bg-slate-400 h-screen py-12'>
    <div>

        <div className='bg-black text-white p-2 pb-5'>
          <span className={`${problem.difficulty}`}>{problem.difficulty}</span>
          <h1 className=''>{problem.description}</h1>

        </div>
        <div className='m-4'>

        <Editor
          height="50vh"
          width="100%"
          theme='vs-dark'
          defaultLanguage='java'
        />
        </div>

    </div>

    </div>
  )
}

export default Question