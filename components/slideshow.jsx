"use client"

import { useState,useEffect } from "react";
import Image from "next/image"
import Link from 'next/link'


function Slideshow(props) {

    let [slidestate , slidestatechanger] = useState(1)
    let [clock, updateClock] = useState(`Welcome...`)
    
    function slidestatefun() {
      switch (slidestate) {
        case 1:
          slidestatechanger(2)
          break;
          case 2:
          slidestatechanger(3)
          break;
          case 3:
          slidestatechanger(1)
          break;
      }
      const d = new Date()
      updateClock(`${String(d.getFullYear())}/${String(d.getMonth()+1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')} - ${d.toLocaleTimeString()}`)
    }
    
    useEffect(()=>{
      setTimeout(() => {
          slidestatefun()
      }, 3000);
    },[slidestate]
    )
    
      return (
        <>
        <div className="w-full h-[250px] aspect-video flex flex-row overflow-hidden transition-all relative overflow-hidden">
            <img
              src={props.src1}
              alt="image 1"
              className="h-full w-full object-cover transition-all duration-500"
              style={{width: slidestate == 1 ? '100%' : '0%'}}
            />
            <img
              src={props.src2}
              alt="image 1"
              className="h-full w-full object-cover transition-all duration-500"
              style={{width: slidestate == 2 ? '100%' : '0%'}}
            />
            <img
              src={props.src3}
              alt="image 1"
              className="h-full w-full object-cover transition-all duration-500"
              style={{width: slidestate == 3 ? '100%' : '0%'}}
            />
            <b className="fixed z-2 right-3 absolute bottom-0 top-[87%] text-white" style={{textShadow: '00 1px 10px black'}}>{clock}</b>
        </div>
        <Link href={"/cart"} className='text-white font-semibold text-lg mx-2 '>
          <Image src={"/shopping-cart.svg"} width={65} height={65} className='mr-2 hover:cursor-pointer hover:scale-110 active:cursor-grabbing transition-all fixed z-3 bg-blue-400 bottom-6 right-6 p-5 rounded-[20px]'/>
        </Link>
        </>
      );
    }
    
    function Catagories(props) {
      return(
        <div className='flex flex-col items-center justify-center items- mt-4 select-none'>
          <span className='flex justify-center w-full text-blue-500 font-semibold text-lg'>Catagories</span>
          <div className='w-5/6 grid grid-cols-2 gap-[5px] mt-2'>
            <div className='w-full h-14 flex justify-center items-center border-2 border-blue-500 text-white font-medium rounded-md bg-blue-500 hover:cursor-pointer active:cursor-grabbing transition-all active:scale-90 hover:bg-white hover:text-blue-500'>Engine</div>
            <div className='w-full h-14 flex justify-center items-center border-2 border-blue-500 text-white font-medium rounded-md bg-blue-500 hover:cursor-pointer active:cursor-grabbing transition-all active:scale-90 hover:bg-white hover:text-blue-500'>Gear Box</div>
            <div className='w-full h-14 flex justify-center items-center border-2 border-blue-500 text-white font-medium rounded-md bg-blue-500 hover:cursor-pointer active:cursor-grabbing transition-all active:scale-90 hover:bg-white hover:text-blue-500'>Injector</div>
            <div className='w-full h-14 flex justify-center items-center border-2 border-blue-500 text-white font-medium rounded-md bg-blue-500 hover:cursor-pointer active:cursor-grabbing transition-all active:scale-90 hover:bg-white hover:text-blue-500'>Body Parts</div>  
            <div className='w-full h-14 flex justify-center items-center border-2 border-blue-500 text-white font-medium rounded-md bg-blue-500 hover:cursor-pointer active:cursor-grabbing transition-all active:scale-90 hover:bg-white hover:text-blue-500'>Differencel</div>
            <div className='w-full h-14 flex justify-center items-center border-2 border-blue-500 text-white font-medium rounded-md bg-blue-500 hover:cursor-pointer active:cursor-grabbing transition-all active:scale-90 hover:bg-white hover:text-blue-500'>Other</div>
          </div>
        </div>
      )
    }

    export default Slideshow