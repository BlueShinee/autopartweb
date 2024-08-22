"use server"

import { getServerSession } from "next-auth";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";

export const createuser = async (formdata) =>{
    const pb = new PocketBase('http://127.0.0.1:8090');
    const user = await getServerSession()

    const Whatsapp = formdata.get("number")
    const adderss = formdata.get("address")
    
    const data = {
        "orders": {
            "array": []
          },
        "cart": {
            "array": []
          },
        "address": adderss,
        "whatsapp_number": Whatsapp,
        "userid": "test",
        "is_admin": false,
        "email": user.user.email
    };
    console.log(data);
    const record = await pb.collection('users').create(data);
    redirect("/")
}