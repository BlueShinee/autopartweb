"use client"

import PocketBase from 'pocketbase';
import Image from 'next/image';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';


function Itemlisting(props) {
    const records = props.records
    return (
        <div className='flex flex-col items-center w-full mt-4 overflow-hidden p-3 min-h-[50vh]'>
            <h2 className='text-left w-full ml-9 font-semibold text-blue-500 text-lg'>{props.title}</h2>
            <div className='flex flex-row flex-wrap w-full justify-center items-center'>
                {records.map((value,index)=>{
                    if (index < 20) {
                        return <Card idEditing={props.idEditing} isLoaded={props.isLoaded} itemid={value.id} title={value.name} desc={value.desc} discount_price={value.discount_price} price={value.price} img={value.urls.array?.[0]}/> 
                    }
                })}
            </div>
        </div>
    )
}

function Card(props){
    return (
        <>
        {props.isLoaded == false ? (
            <div className='flex flex-row'>
                <ShimmerCard/>
                <ShimmerCard/>
                <ShimmerCard/>
            </div>
        ) : (
            <div className="flex justify-center items-center p-2">
                <Link
                    href={props.idEditing == true ? `/adminpanel/items/${props.itemid}` : `/Items/${props.itemid}`}
                    className="hover:scale-105 transition-all w-[160px] md:w-[200px] h-72 rounded-xl shadow-lg border-2 border-gray-300 my-4 flex flex-col items-center overflow-hidden"
                >
                    <div className="w-full aspect-1 h-64 border-b-gray-300 border-b-1 flex bg-gray-300">
                        <CldImage
                            src={props.img}
                            alt=""
                            width={500}
                            height={500}
                            className="aspect-1 w-[100%] object-contain rounded-t-md"
                        />
                    </div>
                    <div className="flex flex-col w-full h-full justify-between p-3 bg-white">
                        <div className="text-left">
                            <span className="text-lg font-semibold text-gray-700 line-clamp-1">
                                {props.title}
                            </span>
                            <span className="text-gray-500 text-sm line-clamp-3 leading-4 mt-1">
                                {props.desc}
                            </span>
                        </div>
                        <span className="text-blue-600 text-l font-bold mt-3">
                            {Number(props.discount_price) > 0 ? (
                                <>
                                    <s className="text-red-400 text-xs">RS. {props.price}/=</s>
                                    <i className="text-gray-400 text-xs"> {Math.round(((props.price - props.discount_price) / props.price) * 100)}% off</i><br />
                                    RS. {props.discount_price}/=
                                </>
                            ) : (
                                <>RS. {props.price}/=</>
                            )}
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
