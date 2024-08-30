"use client"

import {useState} from "react"
import Image from "next/image"
import Link from 'next/link'

function Navbar(props){
    let [navbar , setnavstate] = useState(false)
  //const navbar = false
  function navstate(nav){
    setnavstate(nav)
  }
    return(
    <div className="flex w-full h-16 flex-row justify-between items-center bg-blue-400 z-10 shadow-md select-none sticky">
      <div className='flex w-full h-16 flex-row justify-between items-center bg-blue-400'>
        <h1 className="text-white mx-5 text-xl font-bold">{props.redirectBack === false ? (props.brandname) : <Link href={props.redirectBack}><i className="fa fa-arrow-left"></i> {props.brandname}</Link>}</h1>
        <div className="flex flex-row items-center mx-5">
          <div className="flex overflow-hidden m-0 p-0">
            <div className='flex md:w-[100px] w-0 items-center text-white font-semibold text-lg mx-2 m-2 overflow-hidden' onClick={()=>{
                props.menufunc(true)
              }}>
              <Image src={'/phone.svg'} width={24} height={24} className='md:w-8 w-0 h-auto hover:cursor-pointer hover:scale-110 active:cursor-grabbing transition-all'/>
              <span className="p-2 text-white">Hotline</span>
            </div>
            <Link href={"/info"} className='flex md:w-[80px] w-0 items-center text-white font-semibold text-lg mx-2 m-2 overflow-hidden'>
              <Image src={'/info.svg'} width={24} height={24} className='hover:cursor-pointer hover:scale-110 active:cursor-grabbing transition-all'/>
              <span className="p-2 text-white">Info</span>
            </Link>
            <Link href={"/adminpanel"} style={{display: props.isAdmin ? 'flex' : 'none'}} className='flex md:w-[150px] w-0 items-center text-white font-semibold text-lg mx-2 m-2 overflow-hidden'>
              <Image src={'/admin-settings.svg'} width={24} height={24} className='hover:cursor-pointer hover:scale-110 active:cursor-grabbing transition-all'/>
              <span className="p-2 text-white nowrap">Admin_Panel</span>
            </Link>
          </div>
          
          <Link href={"/profile"} className='text-white font-semibold text-lg mx-2 '>
            <Image unoptimized src={props.profileImage} width={24} height={24} className='h-auto w-8 hover:cursor-pointer hover:scale-110 active:cursor-grabbing transition-all rounded-[20px] border-1 border-white'/>
          </Link>
          <Image src={"/line-3.svg"} width={24} height={24} className='md:w-0 h-auto w-8 hover:cursor-pointer hover:scale-110 active:cursor-grabbing transition-all' onClick={(e)=>{if(navbar){navstate(false)}else{navstate(true)}}}/>
        </div>
      </div>
      <div className={`flex flex-col overflow-x-hidden items-center absolute w-full h-auto ${navbar?"top-16":"-top-80"} bg-blue-500 -z-10 transition-all`}>
  
        <div className='flex w-full h-12 items-center justify-left mt-3 ml-8 px-7 border-l-4 border-white rounded-[3px]'>
          <div className='flex flex-row justify-center items-center hover:cursor-pointer transition-all active:cursor-grabbing hover:scale-105 active:scale-95'>
            <Image className='w-auto h-4 mr-2' width={24} height={24} src={"/user.svg"}/>
            <Link href={"/profile"} className='text-white font-semibold text-lg'>My Profile</Link>
          </div>
        </div>

        <div style={{display: !props.isAdmin ? 'flex' : 'none'}} className='flex w-full h-12 items-center justify-left mt-3 ml-8 px-7 border-l-4 border-white rounded-[3px]'>
          <div className='flex flex-row justify-center items-center hover:cursor-pointer transition-all active:cursor-grabbing hover:scale-105 active:scale-95'>
            <Image className='w-auto h-4 mr-2' width={24} height={24} src={"/shopping-cart.svg"}/>
            <Link href={"/cart"} className='text-white font-semibold text-lg'>Cart</Link>
          </div>
        </div>

        <div style={{display: props.isAdmin ? 'flex' : 'none'}} className='flex w-full h-12 items-center justify-left mt-3 ml-8 px-7 border-l-4 border-white rounded-[3px]'>
          <div className='flex flex-row justify-center items-center hover:cursor-pointer transition-all active:cursor-grabbing hover:scale-105 active:scale-95'>
            <Image className='w-auto h-4 mr-2' width={24} height={24} src={"/admin-settings.svg"}/>
            <Link href={"/adminpanel"} className='text-white font-semibold text-lg'>Admin Controll Panel</Link>
          </div>
        </div>

        <div className='flex w-full h-12  items-center justify-left mt-3 ml-8 px-7 border-l-4 border-white rounded-[3px]'>
          <div className='flex flex-row justify-center items-center hover:cursor-pointer transition-all active:cursor-grabbing hover:scale-105 active:scale-95' onClick={()=>{
              props.menufunc(true)
            }}>
            <Image className='w-auto h-4 mr-2' width={24} height={24} src={"/phone.svg"}/>
            <p className='text-white font-semibold text-lg'>Hotline</p>
          </div>
        </div>
  
        <div className='flex w-full h-12 items-center justify-left mt-3 ml-8 px-7 border-l-4 border-white rounded-[3px]'>
          <div className='flex flex-row justify-center items-center hover:cursor-pointer transition-all active:cursor-grabbing hover:scale-105 active:scale-95'>
            <Image className='w-auto h-4 mr-2' width={24} height={24} src={'/info.svg'}/>
            <Link href={"/info"} className='text-white font-semibold text-lg'>How to Use</Link>
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
  