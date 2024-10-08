import Link from 'next/link';
import Image from "next/image"

import Editable from './editable';

import { getServerSession } from "next-auth";
import Header from "@/components/header";
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


    let userdata = await pb.collection('users').getList(1, 50, {
        filter: `email = "${user.user.email}"`,
    })
    userdata = userdata.items[0]
    
    const settings = await pb.collection('settings').getOne('bussiness__data')
    
  return (
    <>
    <Header settings={settings} redirectBack={'/'} title="Profile"  isLogged={user?.user !== undefined?true:false} profileImage={user?.user.image || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}/>
    <div className="w-full flex-col">
        <div className='w-full flex flex-col items-center mt-20'>
            <Image unoptimized src={user.user.image} width={50} height={50} className='rounded-full w-32'/>
            <span className='mt-4 text-lg font-medium'>{user.user.name}</span>
            <span className='-mt-2 text-sm text-gray-600 font-medium'>{user.user.email}</span>
            <Editable number={userdata["whatsapp_number"]} address={userdata["address"]}/>
        </div>
    </div>
    </>
  )
}
