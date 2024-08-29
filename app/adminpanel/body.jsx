"use client"

import PocketBase from 'pocketbase';
import Image from 'next/image';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';


export default function Body(props) {

  return (
    <div className="w-full min-h-[100vh] flex flex-col justify-start items-center overflow-x-hidden">
        <div className='flex flex-wrap w-full flex-row justify-left items-left mt-3 pl-2'>
            <Link href={"/"} className="flex-col p-2 m-2 flex justify-center items-center text-lg font-semibold text-white bg-blue-400 rounded-md hover:bg-green-600 transition-all hover:cursor-pointer">
                <i className="fas fa-home text-5xl m-4"></i>
                HOME
            </Link>
            <Link href={"/profile"} className="flex-col p-2 m-2 flex justify-center items-center text-lg font-semibold text-white bg-blue-400 rounded-md hover:bg-green-600 transition-all hover:cursor-pointer">
                <i className="fa fa-user text-5xl m-4"></i>
                PROFILE
            </Link>
            <Link href={"/adminpanel/settings"} className="flex-col p-2 m-2 flex justify-center items-center text-lg font-semibold text-white bg-blue-400 rounded-md hover:bg-green-600 transition-all hover:cursor-pointer">
                <i className="fas fa-cogs text-5xl m-4"></i>
                SETTINGS
            </Link>
        </div>
        <div className='flex flex-wrap w-full flex-row justify-left items-left mt-3 pl-2'>
            <Link href={"/adminpanel/create"} className="flex-col p-2 m-2 flex justify-center items-center text-lg font-semibold text-white bg-green-400 rounded-md hover:bg-green-600 transition-all hover:cursor-pointer">
                <i className="fa fa-plus text-5xl m-4"></i>
                ADD ITEM
            </Link>
            <Link href={"/adminpanel/items"} className="flex-col p-2 m-2 flex justify-center items-center text-lg font-semibold text-white bg-green-400 rounded-md hover:bg-green-600 transition-all hover:cursor-pointer">
                <i className="fas fa-box text-5xl m-4"></i>
                EDIT ITEMS
            </Link>
            <Link href={"/adminpanel/orders"} className="flex-col p-2 m-2 flex justify-center items-center text-lg font-semibold text-white bg-green-400 rounded-md hover:bg-green-600 transition-all hover:cursor-pointer">
                <i className="fas fa-shopping-cart text-5xl m-4"></i>
                ORDERS
            </Link>
        </div>
    </div>
  )
}


function Card(props) {
    console.log(props.img.array?.[0]);
    
    return(
        <Link href={`/adminpanel/items/${props.itemid}`} className='flex w-[90%] my-1 border-2 border-gray-400 rounded-lg h-32'>
            <CldImage src={props.img.array?.[0]}  width={150} height={150} className='w-[40%] object-contain border-r-2 border-gray-400'/>
            <div className='flex flex-col px-4 py-2 justify-between h-32'>
                <div className='flex flex-col'>
                    <span className='line-clamp-1 font-medium'>{props.title}</span>
                    <span className='text-sm text-gray-700 line-clamp-3'>{props.desc}</span>
                </div>
                <span className='font-medium'>RS.{props.price}/=</span>
            </div>
        </Link>
    )
}