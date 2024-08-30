"use server"

import { getServerSession } from "next-auth";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";

import {v2 as cloudinary} from "cloudinary"
const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');



export default async function deleteImg(itemId,record,photoArray) {

  cloudinary.config({
    cloud_name:"dc9ljknn0",
    api_key:"475778789893792",
    api_secret:"UAlJvOCXdr7xDQZKruNuD2w1T-I",
    secure:true
})


  record.urls.array.map((v,i)=>{
    if (v == itemId) {
      record.urls.array.splice(i,1)
    }
  })

  const recordUpdate = await pb.collection('items').update(record.id, record);

  cloudinary.api
  .delete_resources([itemId], 
    { type: 'upload', resource_type: 'image' })
  .then();

  redirect(`/adminpanel/items/${record.id}`)

}
