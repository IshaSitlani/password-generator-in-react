import { useEffect, useRef } from 'react';
import { useState , useCallback } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const[numberAllowed,setNumberAllowed] = useState(false);
  const[charAllowed,setCharAllowed] = useState(false);
  const[password,setPassword] = useState('');

  //useRef hookgit 
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if(charAllowed)  str += "!@#%^&*()_+~`{}[]'?:; "

    for (let i = 0; i <= length; i ++) {

      let  randomIndex = Math.floor(Math.random() * str.length  )
      let char = str.charAt(randomIndex)
      pass += char
    }
      setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])


 const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,999);
  window.navigator.clipboard.writeText(password)
 },[password])



  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8
    text-white bg-gray-800 font-semibold'>
      <h1 className=' text-orange-500 text-center my-3 text-xl'>Password generator</h1>
      <div className='text-orange-500 flex flex-shadow rounded-lg overflow-hidden mb-4'>
        <input
         type="text"
         value={password}
         className='outline-none w-full py-1 px-3 text-center'
         placeholder='password'
         readOnly
         ref={passwordRef}
         />
          <button 
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3
          py-0.5 shrink-0'>copy</button>


      </div>

      <div className=' flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
          onChange={(e) => {setLength(Number(e.target.value))}}
          type="range"
          min = {8}
          max={30}
          value={length}
          className='cursor-pointer'
           />
           <label>length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1 ms-3 '>
          <input
           type="checkbox"
           checked= {numberAllowed}
           id='numberInput'
           onChange={()=>{
            setNumberAllowed((prev)=> !prev)
           }}
           />
           <label className='text-white' htmlFor="numberInput">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
           type="checkbox"
           checked={charAllowed}
           id='characterInput'
           onChange={()=>{
            setCharAllowed((prev)=> !prev)
           }}
           />
           <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
