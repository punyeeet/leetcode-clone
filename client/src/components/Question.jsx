import React from 'react'
import { useState , useRef,useEffect , useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Editor from "@monaco-editor/react"
import { BASE } from './helper';
import LoginContext from '../context/LoginContext';

const files = [
  {
    name: "script.py",
    language: "python",
    value: "Here is some python text"
  },
  {
    name: "code.java",
    language: "java",
    value: "class Solution{\n\n}"
  }
]

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


  const [file, setFile] = useState(0); 
  const editorRef = useRef(null);
  
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const handleChange = (event) => {

    console.log(event.target.value);
    setFile(event.target.value);
  };

  const handlSubmit = (e)=>{
    if(user){
      console.log("submitted successfully")
    }else{
      console.log("user not signed in")
    }
  }

  const {user} = useContext(LoginContext)

  return (
    
    <div className='grid grid-cols-2 bg-slate-400 h-screen py-12 overflow-clip'>

        <div className='bg-zinc-900 text-white p-2 pb-5'>
        
          <span className={`${problem.difficulty}`}>{problem.difficulty}</span>
          <h1 className=''>{problem.description}</h1>

        </div>
        
        <div className="m-4 h-screen">
      

      <select value={file} onChange={handleChange} className='mb-2'>
      {files.map((ele,index)=>(
        <option value={index} key={index}>{ele.language}</option>
      ))
      }
     </select>

      
        
      <Editor
        height="50vh"
        width="100%"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        path={files[file].name}
        defaultLanguage={files[file].language}
        defaultValue={files[file].value}
        className=''
      />

<button className = { user ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded ":"bg-blue-300 text-white font-bold py-2 px-4 rounded mt-2 cursor-not-allowed"} onClick={handlSubmit}>
  Submit
</button>
    </div>

        </div>

    

    
  )
}

export default Question