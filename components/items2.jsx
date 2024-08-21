"use client"
import Image from "next/image";
import { useState } from "react";

export default function items2(props) {
  console.log(props.photoURL);
  const imgurl = props.photoURL

  const [showimge , changeimage] = useState(0)

  
  return (
    <>
        <Image src={imgurl[showimge]} unoptimized width={12} height={12} className="w-[90%] rounded-lg shadow-xl"/>
{        <div className="w-[90%] overflow-x-scroll overflow-y-hidden flex justify-around items-center mt-2 gap-3 snap-x snap-mandatory scrollbar-thin">
            {imgurl.map((value,index)=>{
                return <Image width={12} height={12} unoptimized src={value} className="w-[23%] snap-center h-20 object-contain bg-gray-300 border-gray-400 border-2 shadow-xl p-2 rounded-md transition-all hover:scale-105 hover:shadow-2xl hover:bg-gray-400" onClick={()=>{changeimage(index)}}/>
            })}
        </div>}
    </>
  )
}
