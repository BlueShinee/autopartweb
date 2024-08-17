"use client"

import {useState} from "react"

function Navbar(props){
    let [navbar , navstate] = useState(false)

    return(
    <div className="flex w-full h-16 flex-row justify-between items-center bg-blue-400 relative z-10 shadow-md select-none">
      <div className='flex w-full h-16 flex-row justify-between items-center bg-blue-400'>
        <h1 className="text-white mx-5 text-xl font-bold">{props.brandname}</h1>
        <div className="flex flex-row mx-5">
          <img src={"../public/phone.svg"} alt="" className='mr-2 h-auto w-6 hover:cursor-pointer hover:scale-110 active:cursor-grabbing transition-all' onClick={()=>{
            props.menufunc(true)
          }}/>
          <img src={"../public/line-3.svg"} alt="" className='h-auto w-8 hover:cursor-pointer hover:scale-110 active:cursor-grabbing transition-all' onClick={(e)=>{if(navbar){navstate(false)}else{navstate(true)}}}/>
        </div>
      </div>
      <div className={`flex flex-col items-center absolute w-full h-auto ${navbar?"top-16":"-top-80"} bg-[#8FB4DF] -z-10 transition-all`}>
  
        <div className='flex w-full h-12 items-center justify-center mt-4'>
          <div className='flex flex-row justify-center items-center hover:cursor-pointer transition-all active:cursor-grabbing hover:scale-105 active:scale-95'>
            <img className='w-auto h-4 mr-2' src={"@/public/user.svg"}/>
            <span className='text-white font-semibold text-lg'>Profile</span>
          </div>
        </div>
  
        <div className='flex w-full h-12  items-center justify-center '>
          <div className='flex flex-row justify-center items-center hover:cursor-pointer transition-all active:cursor-grabbing hover:scale-105 active:scale-95'>
            <img className='w-auto h-4 mr-2' src={"@/public/question.svg"}/>
            <p className='text-white font-semibold text-lg'>How to order</p>
          </div>
        </div>
  
        <div className='flex w-full h-12 items-center justify-center'>
          <div className='flex flex-row justify-center items-center hover:cursor-pointer transition-all active:cursor-grabbing hover:scale-105 active:scale-95'>
            <img className='w-auto h-4 mr-2' src={'@/public/info.svg'}/>
            <span className='text-white font-semibold text-lg'>More Information</span>
          </div>
        </div>
  
        <div className='w-11/12 flex justify-center items-center h-12 text-white font-bold text-lg mt-6 mb-4 bg-blue-400 rounded-md border-2 border-blue-500 hover:cursor-pointer hover:bg-blue-500 transition-all active:cursor-grabbing active:scale-95'>Log In</div>
      </div>
    </div>
    )
  }

  
  export default Navbar