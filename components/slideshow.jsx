
import { useState,useEffect } from "react";


function Slideshow(props) {

    let [slidestate , slidestatechanger] = useState(props.src1)
    
    function slidestatefun() {
      switch (slidestate) {
        case props.src1:
          slidestatechanger(props.src2)
          break;
          case props.src2:
          slidestatechanger(props.src3)
          break;
          case props.src3:
          slidestatechanger(props.src1)
          break;
      }
    
    }
    
    useEffect(()=>{
      setTimeout(() => {
          slidestatefun()
      }, 2000);
    },[slidestate]
    )
    
      return (
        <div className="w-full aspect-video flex flex-row overflow-hidden transition-all">
            <img
              src={slidestate}
              alt="image 1"
              className="h-full w-full object-cover transition-all"
            />
        </div>
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