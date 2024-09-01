"use server"
import { redirect } from 'next/navigation';
import PocketBase from 'pocketbase';



export default async function createItem(fromData) {
    const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');

    const data ={
        "name": fromData.get("itemname"),
        "price": fromData.get("price"),
        "avalable": true,
        "big_desc":{
            "buletlist": [""],
            "end-paragraph": "",
            "st-paragraph": ""
          },
        "urls":{
            "array": []
          }
    }

    const record = await pb.collection('items').create(data);
    redirect(`/adminpanel/items/${record.id}`)
}