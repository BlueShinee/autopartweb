"use client"

import { getServerSession } from "next-auth";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";
import { CldImage } from 'next-cloudinary';


import deleteImg from "./deleteImg.js"
import uploadImg from "./upload.js"



export default function upload(props) {

    const record = props.record
    let photoArray = record.urls.array
    

    return (
        <div>
            <div className="grid grid-cols-3 w-full gap-2 px-4">
                {photoArray.map((v,i)=>{
                    return(
                        <div className="w-[100%] p-[10%] mb-4 h-24 rounded-md transition-all hover:bg-red-600  border-2 border-gray-400 flex justify-center items-center">
                            <CldImage src={v} width={150} height={150} onClick={()=>{deleteImg(v,record,photoArray)}} className="object-contain w-[100%] h-24"/>
                        </div>
                    )
                })}
            </div>


            <form action={uploadImg} className="flex justify-between">
                <input type="file" name="file" className="w-64"/>
                <input type="text" name="itemid" className="hidden" value={props.record?.id}/>
                <input type="submit" value="Add File" className="py-1 px-2 bg-green-600 text-white font-medium rounded-md hover:cursor-pointer hover:bg-green-700"/>
            </form>
        </div>
      )
}
