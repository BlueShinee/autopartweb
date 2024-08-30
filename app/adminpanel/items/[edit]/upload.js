"use server"

import { getServerSession } from "next-auth";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";

import {v2 as cloudinary} from "cloudinary"
const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');


export default async function uploadImg(formData) {
    cloudinary.config({
        cloud_name:"dc9ljknn0",
        api_key:"475778789893792",
        api_secret:"UAlJvOCXdr7xDQZKruNuD2w1T-I",
        secure:true
    })


    

    let uploadedImagePublicID
    const itemid = formData.get("itemid")
    const file = formData.get("file")
    if (file.name == "undefined") {
        return
    }
    const arraybuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arraybuffer)


    

    const rando = Math.random()


    let record = await pb.collection('items').update(itemid,{"itemid":rando});




    await new Promise((resolve,reject)=>{

        cloudinary.uploader.upload_stream({}, function(err,result){
            if (err) {
                reject(err)
                return
            }
            uploadedImagePublicID = result.public_id
            resolve(result)
        }).end(buffer)

    })

    record["urls"].array.push(uploadedImagePublicID)

    let records = await pb.collection('items').update(itemid,record);
    redirect(`/adminpanel/items/${itemid}`)
}