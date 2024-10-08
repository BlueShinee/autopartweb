"use client"

import PocketBase from 'pocketbase';
import Image from 'next/image';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import {useState} from "react"


function Cart(props) {
    const [isActiveOrders, setActiveOrHistory] = useState(true)
    return (
        <>
        <div className='flex w-full justify-start p-4'>
            <span className={`px-3 m-2 rounded-md text-lg font-semibold text-white transition-all cursor-pointer ${isActiveOrders  ? 'bg-blue-600' : 'bg-blue-400'}  py-2`} onClick={() => {setActiveOrHistory(true)}}>Active</span>
            <span className={`px-3 m-2 rounded-md text-lg font-semibold text-white transition-all cursor-pointer ${!isActiveOrders ? 'bg-blue-600' : 'bg-blue-400'} py-2`} onClick={() => {setActiveOrHistory(false)}}>History</span>
        </div>
        <div className='flex flex-col items-center w-full mt-4 overflow-hidden p-3 min-h-[50vh]'>
            <h2 className='text-left w-full ml-9 font-semibold text-blue-500 text-lg'>{props.title}</h2>
            <div className='flex flex-row flex-wrap w-full justify-center items-center'>
                {props.mycart.map((value,index)=>{
                    if(isActiveOrders){
                        if(value.state.match(/pending|ontheway/g)){
                            return <Card props={value} isLogged={props.isLogged}/>
                        }
                    }else{
                        if(value.state.match(/delivered|rejected/g)){
                            return <Card props={value} isLogged={props.isLogged}/>
                        }
                    }
                })}
            </div>
        </div>
        </>
    )
}

function Card({props, isLogged}){
    return (
        <>
        {isLogged == false ? (
            <div className='flex flex-col w-full'>
                <ShimmerCard/>
                <ShimmerCard/>
                <ShimmerCard/>
            </div>
        ) : (
            <div className="flex justify-center items-center p-2 w-full">
                <Link
                    href={`/cart/${props.id}`}
                    className=" w-full border-2 border-gray-300 my-4 flex flex-col items-center overflow-hidden"
                >
                    <div className="flex flex-col w-full h-full justify-between p-3 bg-white">
                        <div className="text-left">
                            <span className="text-2xl font-semibold text-gray-700 line-clamp-1">
                                {props.itemName}
                            </span>
                            <span className="text-gray-500 text-sm line-clamp-3 leading-4 mt-1">
                                {props.itemDesc}
                            </span>
                            <br />
                            <span className="text-lg font-semibold text-gray-500 line-clamp-1">
                                Quantity - {props.quantity}
                            </span>
                            <span className="text-lg font-semibold text-gray-500 line-clamp-1">
                                Total - LKR {props.price}
                            </span>
                            {/* { props.payment == false ? (
                                <span className="text-l font-semibold text-red-500">
                                    Invalid or Pending Payment!
                                </span>
                            ):(null)} */}
                        </div>
                        <div className='w-full flex items-end justify-between'>
                            { props.state === "pending" ? (<span className="text-blue-600 text-l font-bold mt-3">Pending</span>):(null)}
                            { props.state === "ontheway" ? (
                                <>
                                    <span className="text-green-600 text-l font-bold mt-3">On the way</span>
                                    <span className="hover:scale-105 transition-all text-grey-600 text-l font-bold mt-3">Confirm Delivered if you got</span>
                                </>):(null)}
                            { props.state === "rejected" ? (<span className="text-red-600 text-l font-bold mt-3">Rejected</span>):(null)}
                            { props.state === "delivered" ? (<span className="text-black text-l font-bold mt-3">Delivered</span>):(null)}
                        </div>
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

export default Cart
