import Link from 'next/link';
import Image from "next/image"

import Header from "@/components/header";
import Body from './body';

import { getServerSession } from "next-auth";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";

export const revalidate = 0
export const dynamic = "force-dynamic"


export default async function page() {
    const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');
    const user = await getServerSession()

    if (user == null) {
        redirect("/api/auth/signin")
    }

    let userdata
    const records = await pb.collection('users').getFullList();
    const items = await pb.collection('items').getFullList();
    const settings = await pb.collection('settings').getOne('bussiness__data')

    records.map((v,i)=>{
        if (v.email === user.user.email) {
            userdata = v
        }
    })

    if (userdata["is_admin"] == false) {
        redirect("/")
    }

    console.log(items);
    
  return (
    <div className='flex flex-col'>
        <Header settings={settings} redirectBack={'/adminpanel'} title="Items"  isLogged={user?.user !== undefined?true:false} profileImage={user?.user.image || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}/>
        <Body items={items}/>
    </div>
  )
}
