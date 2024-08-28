"use client"

import { getServerSession } from "next-auth";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";
import { CldImage } from 'next-cloudinary';
import { useState } from "react"
import Swal from 'sweetalert2';


import deleteImg from "./deleteImg.js"
import uploadImg from "./upload.js"



export default function upload(props) {
  let [isLoaded, setIsLoaded] = useState(true)

    const record = props.record
    console.log(record);
    
    let photoArray = record.urls.array
    

    return (
        <div>
            <div className="grid grid-cols-3 w-full gap-2 px-4">
                {photoArray.map((v,i)=>{
                    return(
                        <div className="w-[100%] p-[10%] mb-4 h-24 rounded-md transition-all hover:bg-red-600  border-2 border-gray-400 flex justify-center items-center">
                            <CldImage src={v} width={150} height={150} onClick={()=>{
                                Swal.fire({
                                    title: "Are you sure?",
                                    text: "Delete this image",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#d33",
                                    cancelButtonColor: "#3b56d1",
                                    confirmButtonText: "Delete",
                                    iconColor: '#f8bb86', // Custom color for the icon
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      try {
                                        deleteImg(v,record,photoArray)
                                      } catch (err) {
                                        console.error("Error updating tabs:", err);
                                      }
                                    }
                                  }); 
                                }} className="object-contain w-[100%] h-24"/>
                        </div>
                    )
                })}
            </div>


            <form action={uploadImg} className="flex justify-between px-5">
                <input type="file" name="file" className="uploadFile w-64" accept="image/*"/>
                <input type="text" name="itemid" className="hidden" value={props.record?.id}/>
                <input type="submit" style={{display: isLoaded ? 'block' : 'none'}} onClick={()=>{
                  /* Swal.fire({
                    title: "Image Uploading...",
                    text: "Please wait while your image is being uploaded.",
                    icon: "info",
                  }) */
                  setIsLoaded(false)
                }} value="Add File" className="py-1 px-2 bg-green-600 text-white font-medium rounded-md hover:cursor-pointer hover:bg-green-700"/>
                <ShimmerCard style={{display: !isLoaded ? 'block' : 'none'}}/>
            {/* {isLoaded == true ? (
              <>
                <input type="submit" onClick={()=>{
              setIsLoaded(false)
              Swal.fire({
                title: "Image Uploading...",
                text: "Please wait while your image is being uploaded.",
                icon: "info",
              })}} value="Add File" className="py-1 px-2 bg-green-600 text-white font-medium rounded-md hover:cursor-pointer hover:bg-green-700"/>
              </>
            ) : (
              <ShimmerCard/>
            )} */}
            </form>
        </div>
      )
}

function ShimmerCard({style}) {
  return (
      <div style={style} className="box-x flex flex-col w-full m-1">
          <div className="box buffering h-8"></div>
      </div>
  )
}