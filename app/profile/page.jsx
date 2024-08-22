import Link from 'next/link';
import Image from "next/image"

import Editable from './editable';

import { getServerSession } from "next-auth";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";


export default async function page() {
    const pb = new PocketBase('http://127.0.0.1:8090');
    const user = await getServerSession()

    if (user == null) {
        redirect("/api/auth/signin")
    }


    let userdata
    const records = await pb.collection('users').getFullList();

    records.map((v,i)=>{
        if (v.email === user.user.email) {
            userdata = v
        }
    })

    console.log(userdata["address"]);
    
  return (
    <div className="w-full flex-col">
        <Link href={"/"} className="flex justify-center items-center py-1 m-2 ml-5 hover:bg-blue-500 transition-all active:scale-95   px-4 bg-blue-400 w-24 rounded-md"><span className="text-white font-medium text-lg mr-2">Back</span><Image src={"/back-arrow.svg"}  width={20} height={20}/></Link>
        <div className='w-full flex flex-col items-center mt-20'>
            <Image unoptimized src={user.user.image} width={50} height={50} className='rounded-full w-32'/>
            <span className='mt-4 text-lg font-medium'>{user.user.name}</span>
            <span className='-mt-2 text-sm text-gray-600 font-medium'>{user.user.email}</span>
            <Editable number={userdata["whatsapp_number"]} address={userdata["address"]}/>
        </div>
    </div>
  )
}
