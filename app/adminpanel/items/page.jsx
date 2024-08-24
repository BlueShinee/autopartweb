import Link from 'next/link';
import Image from "next/image"

import Header from './header';
import Body from './body';

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
    const items = await pb.collection('items').getFullList();

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
        <Header />
        <Body items={items}/>
    </div>
  )
}
