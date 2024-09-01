import Link from 'next/link';
import Image from "next/image"

import Header from "@/components/header";

import { getServerSession } from "next-auth";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";
import AdminOrders from '@/components/adminOrders';

export const revalidate = 0
export const dynamic = "force-dynamic"


export default async function page() {
    const STATE = "ontheway"
    const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');
    const settings = await pb.collection('settings').getOne('bussiness__data');
    let orders = await pb.collection('orders').getList(1, 9999999, {
        filter: `state = "${STATE}"`,
    })
    orders = orders.items
    console.log(orders)
    const user = await getServerSession();
    let allcart = []
  
    if (user?.user !== undefined) {
        for (const order of orders) {
            //if(order.payment){
                const item = await pb.collection('items').getOne(order.itemid)
                order.itemName = item.name
                order.itemDesc = item.desc
                allcart.push(order)
            //}
        }
    }

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

    if (userdata["is_admin"] == false) {
        redirect("/")
    }

  return (
    <div className='flex flex-col'>
        <Header settings={settings} redirectBack={'/adminpanel'} title="Orders"  isLogged={user?.user !== undefined?true:false} profileImage={user?.user.image || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}/>
        <AdminOrders state={STATE} mycart={allcart} user={user} isLogged={user?.user !== undefined} />
    </div>
  )
}
