"use server"

import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";


export default async function save_number(formdata) {

    const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');
    const number = formdata.get("WAnumber")
    const user = await getServerSession()

    let userdata

    const records = await pb.collection('users').getFullList();

    records.map((v,i)=>{
        if (v.email === user.user.email) {
            userdata = v
        }
    })

    userdata["whatsapp_number"] = number

    const record = await pb.collection('users').update(userdata["id"], userdata);
    
    redirect("/")
}
