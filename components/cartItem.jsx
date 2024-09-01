"use client"

import PocketBase from 'pocketbase';
import Image from 'next/image';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import {useState} from "react"
import Items2 from "@/components/items2"
import setOrderState from './editOrder';
import Swal from "sweetalert2"

function manageOrder({itemName, user, orderid, state, action}){
    Swal.fire({
        title: `<strong>${itemName}</strong>`,
        text: `Are you sure this order has been ${action}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        customClass: {
            title: 'swal-title',
            text: 'swal-text'
        },
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });
        }
    }).then((result) => {
        if (result.isConfirmed) {
            setOrderState({
                orderid,
                user,
                state
            })
        }
    })
}

function CartItem(props) {
    return (
        <>
        <div className='flex flex-col md:flex-row py-3'>
            <div className="w-full flex flex-col justify-center items-center">
                <Items2 photoURL={props.photoURL} record={props.record}/>
            </div>
            <div className='flex flex-col items-center w-full mt-4 overflow-hidden p-3 min-h-[50vh]'>
                <h2 className='text-left w-full ml-9 font-semibold text-blue-500 text-lg'>{props.title}</h2>
                <div className='flex flex-wrap w-full justify-center items-center'>
                    <Card props={props.mycart[0]} isLogged={props.isLogged} user={props.user}/>
                </div>
            </div>
        </div>
        </>
    )
}

function Card({props, isLogged, user}){
    return (
        <>
        {isLogged == false ? (
            <div className='flex flex-col w-full'>
                <ShimmerCard/>
                <ShimmerCard/>
                <ShimmerCard/>
            </div>
        ) : (
            <div className="flex flex-col md:flex-row justify-center items-center p-2 w-full">
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
                            <span className="text-md font-semibold text-gray-500 line-clamp-1">
                                Order id - {props.id}
                            </span>
                            <span className="text-md font-semibold text-gray-500 line-clamp-1">
                                Item id - {props.itemid}
                            </span>
                            <span className="text-md font-semibold text-gray-500 line-clamp-1">
                                Placed Date - {new Date(props.created).toDateString()}
                            </span>
                            <span className="text-md font-semibold text-gray-500 line-clamp-1">
                                Updated Date - {new Date(props.updated).toDateString()}
                            </span>
                            <span className="text-md font-semibold text-gray-500 line-clamp-1">
                                Email - {props.email}
                            </span>
                            {/* { props.payment == false ? (
                                <span className="text-l font-semibold text-red-500">
                                    Invalid or Pending Payment!<br/><span className='text-sm'>If you clicked the Buy Now button but did not complete the payment and left, this order will be saved as an invalid payment. If you make payment and lose your money, please contact our hotline. Staff can review payment error orders, and they will confirm or refund the money.</span>
                                </span>
                            ):(null)} */}
                        </div>
                        <div className='w-full flex items-end justify-between'>
                            { props.state === "pending" ? (<span className="text-blue-600 text-l font-bold mt-3">Pending</span>):(null)}
                            { props.state === "ontheway" ? (
                                <>
                                    <span className="text-green-600 text-l font-bold mt-3">On the way</span>
                                </>):(null)}
                            { props.state === "rejected" ? (<span className="text-red-600 text-l font-bold mt-3">Rejected</span>):(null)}
                            { props.state === "delivered" ? (<span className="text-black text-l font-bold mt-3">Delivered</span>):(null)}
                        </div>
                        <div className='w-full flex items-center justify-start mt-8'>
                            <Link href={`/Items/${props.itemid}`} className='flex items-center'>
                                <span className="p-1 px-3 border-2 border-blue-500 text-blue-500 text-l rounded-1 font-bold mt-3 mr-2">View Item</span>
                            </Link>
                            { props.state === "ontheway" ? (<span className="p-1 px-3 border-2 text-grey-600 text-l font-bold mt-3" onClick={()=>{
                                manageOrder(
                                    {
                                        itemName: props.itemName,
                                        user,
                                        orderid: props.id,
                                        state: 'delivered',
                                        action: 'delivered'
                                    })
                            }}>Confirm Delivered</span>):(null)}
                            { props.state == "pending" ? (
                                <span className="p-1 px-3 border-2 text-red-600 text-l font-bold mt-3 mr-2 cursor-pointer" onClick={()=>{
                                    manageOrder(
                                        {
                                            itemName: props.itemName,
                                            user,
                                            orderid: props.id,
                                            state: 'delete',
                                            action: 'delete'
                                        })
                                }}>Delete</span>
                            ):(null)}
                        </div>
                    </div>
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

export default CartItem
