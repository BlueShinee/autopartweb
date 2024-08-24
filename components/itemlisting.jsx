"use client"

import PocketBase from 'pocketbase';
import Image from 'next/image';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';


function Itemlisting(props) {
    const records = props.records
    /* const url = pb.files.getUrl(records, records.photos[0], {'thumb': '100x250'});
    
    console.log(url); */
    
    
  return (
    <div className='flex flex-col items-center w-full mt-4'>
        <h2 className='text-center font-semibold text-blue-500 text-lg'>Populer Products</h2>
        <div className='grid grid-cols-2 w-full justify-center items-center'>
            {records.map((value,index)=>{
                if (index < 20) {
                    return <Card itemid={value.id} title={value.name} desc={value.desc} price={value.price} img={value.urls.array?.[0]}/> 
                }
            })}
        </div>
    </div>
  )
}

function Card(props){


    console.log(props.img);
    
    
    return(
        <div className='w-full flex justify-center items-center select-text'>
            <Link href={`/Items/${props.itemid}`} className=' hover:scale-105 transition-all w-44 h-72 rounded-md shadow-xl border-[2px] border-gray-300 my-4 flex flex-col items-center'>
                <div className='w-full aspect-1 border-b-gray-300 border-b-[1px]'>
                    <CldImage src={props.img} alt="" width={500} height={500} className='aspect-1 w-full h-auto rounded-t-md'/>
                </div>
                <div className='flex flex-col w-full h-full justify-between'>
                    <div>
                        <span className='ml-2 line-clamp-1 text-lg font-medium'>{props.title}</span>
                        <span className='text-gray-500 ml-2 text-sm line-clamp-3 leading-4'>{props.desc}</span>
                    </div>
                    <span className='ml-2 text-blue-600 text-lg font-medium mb-1'>RS.{props.price}/=</span>
                </div>
            </Link>
        </div>
    )
}


export default Itemlisting