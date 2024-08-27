"use client"

import {useState} from "react"
import Image from "next/image"
import Link from 'next/link'

function Navbar(props){
    let [navbar , navstate] = useState(false)
  
    return(
    <div className="flex w-full h-16 flex-row justify-between items-center bg-blue-400 z-10 shadow-md select-none sticky">
      <div className='flex w-full h-16 flex-row justify-between items-center bg-blue-400'>
        <h1 className="text-white mx-5 text-xl font-bold">{props.brandname}</h1>
        <div className="flex flex-row mx-5">
          <Image src={"phone.svg"} width={65} height={65} className='mr-2 hover:cursor-pointer hover:scale-110 active:cursor-grabbing transition-all fixed z-3 bg-blue-400 bottom-6 right-6 p-5 rounded-[20px]'  onClick={()=>{
            props.menufunc(true)
          }}/>
          <Link href={"/profile"} className='text-white font-semibold text-lg mx-2 '>
            <Image unoptimized src={props.profileImage} width={24} height={24} className='h-auto w-8 hover:cursor-pointer hover:scale-110 active:cursor-grabbing transition-all rounded-[20px] border-1 border-white'/>
          </Link>
          
          <Image src={"line-3.svg"} width={24} height={24} className='h-auto w-8 hover:cursor-pointer hover:scale-110 active:cursor-grabbing transition-all' onClick={(e)=>{if(navbar){navstate(false)}else{navstate(true)}}}/>
        </div>
      </div>
      <div className={`flex flex-col items-center absolute w-full h-auto ${navbar?"top-16":"-top-80"} bg-[#8FB4DF] -z-10 transition-all overflow-x-hidden`}>
  
        <div className='flex w-full h-12 items-center justify-left mt-3 ml-8 px-7 border-l-4 border-white rounded-[3px]'>
          <div className='flex flex-row justify-center items-center hover:cursor-pointer transition-all active:cursor-grabbing hover:scale-105 active:scale-95'>
            <Image className='w-auto h-4 mr-2' width={24} height={24} src={"user.svg"}/>
            <Link href={"/profile"} className='text-white font-semibold text-lg'>My Profile</Link>
          </div>
        </div>
  
        <div className='flex w-full h-12  items-center justify-left mt-3 ml-8 px-7 border-l-4 border-white rounded-[3px]'>
          <div className='flex flex-row justify-center items-center hover:cursor-pointer transition-all active:cursor-grabbing hover:scale-105 active:scale-95'>
            <Image className='w-auto h-4 mr-2' width={24} height={24} src={"question.svg"}/>
            <p className='text-white font-semibold text-lg'>How to order</p>
          </div>
        </div>
  
        <div className='flex w-full h-12 items-center justify-left mt-3 ml-8 px-7 border-l-4 border-white rounded-[3px]'>
          <div className='flex flex-row justify-center items-center hover:cursor-pointer transition-all active:cursor-grabbing hover:scale-105 active:scale-95'>
            <Image className='w-auto h-4 mr-2' width={24} height={24} src={'info.svg'}/>
            <span className='text-white font-semibold text-lg'>More Information</span>
          </div>
        </div>

        <Link href={"/api/auth/signin"} className="w-11/12 flex justify-center items-center h-12 text-white font-bold text-lg mt-6 mb-4 bg-blue-400 rounded-md border-2 border-blue-500 hover:cursor-pointer hover:bg-blue-500 transition-all active:cursor-grabbing active:scale-95">
          {props.isLogged ? 'Log Out' : 'Log In'}
        </Link>
        
      </div>
    </div>
    )
  }

  
  export default Navbar