"use server"

import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";


export default async function save_number(formdata) {

    const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');
    const number = formdata.get("WAnumber")
    const user = await getServerSession()

    let userdata = await pb.collection('users').getList(1, 50, {
        filter: `email = "${user.user.email}"`,
    })
    userdata = userdata.items[0]

    userdata["whatsapp_number"] = number

    const record = await pb.collection('users').update(userdata["id"], userdata);
    
    redirect("/")
}
