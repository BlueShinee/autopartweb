import { getServerSession } from "next-auth";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";

import {v2 as cloudinary} from "cloudinary"






export default function page({params}) {
    const pb = new PocketBase('http://127.0.0.1:8090');

    


    async function upload(formdata) {
        "use server"


        cloudinary.config({
            cloud_name:"dc9ljknn0",
            api_key:"475778789893792",
            api_secret:"UAlJvOCXdr7xDQZKruNuD2w1T-I",
            secure:true
        })

        const file = formdata.get("file")
        const arraybuffer = await file.arrayBuffer()
        const buffer = new Uint8Array(arraybuffer)


        await new Promise((resolve,reject)=>{

            cloudinary.uploader.upload_stream({}, function(err,result){
                if (err) {
                    reject(err)
                    return
                }
                resolve(result)
            }).end(buffer)

        })
        
    }
    


  return (
    <div>
        <form action={upload}>
            <input type="file" name="file"/>
            <input type="submit" value="Upload"/>
        </form>
    </div>
  )
}
