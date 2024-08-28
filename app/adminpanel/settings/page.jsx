import Link from 'next/link';
import Image from "next/image"

import Header from "@/components/header";

import { getServerSession } from "next-auth";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";
import updateSettings from './updateSettings';


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

    if (userdata["is_admin"] == false) {
        redirect("/")
    }
    const items = await pb.collection('items').getFullList();
    const settings = await pb.collection('settings').getOne('bussiness__data')
    console.log(settings)

  return (
    <div className='flex flex-col'>
        <Header title="Settings"  isLogged={user?.user !== undefined?true:false} profileImage={user?.user.image || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}/>
        <Link href={"/adminpanel"} className="m-4 flex justify-center items-center py-1    hover:bg-blue-500 transition-all active:scale-95   px-4 bg-blue-400 w-24 rounded-md"><span className="text-white font-medium text-lg">Back</span><Image src={"/back-arrow.svg"}  width={20} height={20}/></Link>

        <form action={updateSettings} className="flex flex-col p-4">
            <span className="text-sm text-gray-600 font-medium mt-4">Bussiness Name</span>
            <input type="text" name="bussinessname" defaultValue={settings.name} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>
            
            <span className="text-sm text-gray-600 font-medium mt-4">Slider Image (1)</span>
            <input type="text" name="slider_1" defaultValue={settings.slider_1} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>

            <span className="text-sm text-gray-600 font-medium mt-4">Slider Image (2)</span>
            <input type="text" name="slider_2" defaultValue={settings.slider_2} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>

            <span className="text-sm text-gray-600 font-medium mt-4">Slider Image (3)</span>
            <input type="text" name="slider_3" defaultValue={settings.slider_3} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>

            <div className="flex justify-center items-center">
                <button type="submit" className="mt-12 w-32 py-2 px-4 bg-green-500 transition-all rounded-md hover:bg-green-600 text-white font-semibold">UPDATE</button>
            </div>
        </form>
    </div>
  )
}
