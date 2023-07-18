import React,{useState} from 'react'
import axios from 'axios';

const AddQues = () => {

  
    const [selectedBullet, setSelectedBullet] = useState(null);
  
    const handleBulletClick = (bulletIndex) => {
      
      setSelectedBullet(bulletIndex);
      setQuestion((prev)=>({...prev , difficulty:bulletIndex}))
      console.log(question)
    };

    const [question , setQuestion] = useState({
      "title":null,
      "description":null,
      "acceptance":null,
      "difficulty":null,
      "id":null
    });

    const handleformChange = (e)=>{
      setQuestion((prev)=>({...prev, [e.target.name]:e.target.value}));
      console.log(question)
    }

    const handleSubmit = async e=>{
      e.preventDefault()
      try{    
          await axios.post("http://localhost:3001/addQues",question)
      }catch(err){
        console.log(err)
      }
    }

  return (
    <div className='mt-6 bg-black h-screen py-5'>
    

    
        <div
  className="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-800 mx-auto w-3/4">
  <div
    className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-900 dark:text-neutral-50">
    Add Question
  </div>
  <div className="p-6 " >
  <label className='text-white'>Title</label>
    <input placeholder='Title' name='title' className='block m-auto p-1' onChange={handleformChange}></input>
    <label className='text-white'>Description</label>
    
    
    <textarea className='block mx-auto my-2 p-1' placeholder='Description' name='description' onChange={handleformChange}></textarea>
    <label className='text-white'>Acceptance</label>
    <input placeholder='Acceptance' name='acceptance' className='block mx-auto my-2 p-1' onChange={handleformChange}></input>
    <label className='text-white'>ID</label>
    <input type='number' placeholder='ID' name='id' className='block mx-auto my-2 p-1' onChange={handleformChange}></input>
    
    
    <ul className="w-full block">
  <li onClick={() => handleBulletClick('Easy')}
        className={`cursor-pointer block ${selectedBullet === 'Easy' ? 'w-1/3 mx-auto rounded-lg bg-green-400 p-2 text-orange-950' : 'text-white'}`}>
    Easy
  </li>
  <li onClick={() => handleBulletClick('Medium')}
        className={`cursor-pointer block ${selectedBullet === 'Medium' ? 'w-1/3 mx-auto rounded-lg bg-orange-400 p-2 text-orange-950' : 'text-white'}`}>Medium</li>
  <li onClick={() => handleBulletClick('Hard')}
        className={`cursor-pointer block ${selectedBullet === 'Hard' ? 'w-1/3 mx-auto rounded-lg bg-red-400 p-2 text-orange-950' : 'text-white'}`}>Hard</li>
  
</ul>

    {/* <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
      With supporting text below as a natural lead-in to additional
      content.
    </p> */}
    <button
      type="button"
      className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] m-4 p-1"
      data-te-ripple-init
      data-te-ripple-color="light" onClick={handleSubmit}>
      Submit
    </button>
  </div>
  <div
    className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
    LeetCode.com&reg;
  </div>
</div>
    </div>
    
  )
}

export default AddQues