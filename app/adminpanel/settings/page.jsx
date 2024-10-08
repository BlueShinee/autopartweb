import Link from 'next/link';
import Image from "next/image"

import Header from "@/components/header";

import { getServerSession } from "next-auth";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";
import updateSettings from './updateSettings';

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

    if (userdata["is_admin"] == false) {
        redirect("/")
    }
    const items = await pb.collection('items').getFullList();
    const settings = await pb.collection('settings').getOne('bussiness__data')
    console.log(settings)

  return (
    <div className='flex flex-col'>
        <Header settings={settings} redirectBack={'/adminpanel'} title="Settings"  isLogged={user?.user !== undefined?true:false} profileImage={user?.user.image || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}/>

        <form action={updateSettings} className="flex flex-col p-4">
            <span className="text-sm text-gray-600 font-medium mt-4">Name</span>
            <input type="text" name="bussinessname" defaultValue={settings.name} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>
            
            <span className="text-sm text-gray-600 font-medium mt-4">Meta icon</span>
            <input type="text" name="metaicon" defaultValue={settings.metaicon} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>
            
            <span className="text-sm text-gray-600 font-medium mt-4">Google Map Location</span>
            <input type="text" name="location_map" defaultValue={settings.location_map} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>

            <span className="text-sm text-gray-600 font-medium mt-4">Google Map Embeded</span>
            <input type="text" name="location_embed" defaultValue={settings.location_embed} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>

            <span className="text-sm text-gray-600 font-medium mt-4">Slider Image (1)</span>
            <input type="text" name="slider_1" defaultValue={settings.slider_1} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>

            <span className="text-sm text-gray-600 font-medium mt-4">Slider Image (2)</span>
            <input type="text" name="slider_2" defaultValue={settings.slider_2} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>

            <span className="text-sm text-gray-600 font-medium mt-4">Slider Image (3)</span>
            <input type="text" name="slider_3" defaultValue={settings.slider_3} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>

            <span className="text-sm text-gray-600 font-medium mt-4">Max quantity of order</span>
            <input type="text" name="buy_max_quantity" defaultValue={settings.buy_max_quantity} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>

            <span className="text-sm text-gray-600 font-medium mt-4">Hotline</span>
            <input type="text" name="hotline" defaultValue={settings.hotline} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>

            <span className="text-sm text-gray-600 font-medium mt-4">Facebook</span>
            <input type="text" name="facebook" defaultValue={settings.facebook} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>

            <div className="flex justify-center items-center">
                <button type="submit" className="mt-12 w-32 py-2 px-4 bg-green-500 transition-all rounded-md hover:bg-green-600 text-white font-semibold">UPDATE</button>
            </div>
        </form>
    </div>
  )
}
