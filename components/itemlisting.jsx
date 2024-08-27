"use client"

import PocketBase from 'pocketbase';
import Image from 'next/image';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';


function Itemlisting(props) {
    const records = props.records
    return (
        <div className='flex flex-col items-center w-full mt-4'>
            <h2 className='text-left w-full ml-9 font-semibold text-blue-500 text-lg'>{props.title}</h2>
            <div className='grid grid-cols-2 w-full justify-center items-center'>
                {records.map((value,index)=>{
                    if (index < 20) {
                        return <Card isLoaded={props.isLoaded} itemid={value.id} title={value.name} desc={value.desc} price={value.price} img={value.urls.array?.[0]}/> 
                    }
                })}
            </div>
        </div>
    )
}

function Card(props){
    return (
        <>
        {props.isLoaded === "false" ? (<ShimmerCard/>) : (
        <div className="w-full flex justify-center items-center select-text">
            <Link
                href={`/Items/${props.itemid}`}
                className="hover:scale-105 transition-all w-48 h-80 rounded-xl shadow-lg border-2 border-gray-300 my-4 flex flex-col items-center overflow-hidden"
            >
            <div className="w-full aspect-1 border-b-gray-300 border-b-1 bg-gray-100">
            <CldImage
                src={props.img}
                alt=""
                width={500}
                height={500}
                className="aspect-1 w-full object-contain rounded-t-md h-36 transition-transform duration-300 ease-in-out hover:scale-110"
            />
            </div>
            <div className="flex flex-col w-full h-full justify-between p-3 bg-white">
            <div className="text-left">
                <span className="block text-lg font-semibold text-gray-700 line-clamp-1">
                {props.title}
                </span>
                <span className="text-gray-500 text-sm line-clamp-3 leading-4 mt-1">
                {props.desc}
                </span>
            </div>
            <span className="block text-blue-600 text-xl font-bold mt-3">
                RS. {props.price}/=
            </span>
            </div>
        </Link>
    </div>
        )}
        
    </>)
}

function ShimmerCard() {
    return (
        <div className="w-full flex justify-center items-center p-4">
            <div className="content w-full max-w-md p-5 flex flex-col items-center bg-white shadow-lg rounded-xl">
                <div className="circle buffering w-full h-20 m-4"></div>
                <div className="box-x flex flex-col w-full">
                    <div className="box buffering h-4"></div>
                    <div className="box buffering h-4 mt-2"></div>
                    <div className="box buffering h-4 mt-2"></div>
                </div>
            </div>
        </div>
    )
}

export default Itemlisting