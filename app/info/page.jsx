import Link from 'next/link';
import Image from "next/image"
import Body from './body';

import { getServerSession } from "next-auth";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";
import Header from "@/components/header";

export const revalidate = 0
export const dynamic = "force-dynamic"

export default async function page() {
    const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');
    const user = await getServerSession()
    const settings = await pb.collection('settings').getOne('bussiness__data')

    if (user == null) {
        redirect("/api/auth/signin")
    }

    let userdata = await pb.collection('users').getList(1, 50, {
        filter: `email = "${user.user.email}"`,
    })
    userdata = userdata.items[0]
    
    const items = await pb.collection('items').getFullList();


    if (userdata["is_admin"] == false) {
        redirect("/")
    }

    console.log(items)
    
  return (
    <div className='flex flex-col'>
        <Header settings={settings} redirectBack={'/'} title="How to Use ?" isAdmin={userdata["is_admin"]} isLogged={user?.user !== undefined?true:false} profileImage={user?.user.image || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}/>
        <Body items={items} settings={settings}/>
    </div>
  )
}
