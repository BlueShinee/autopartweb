
import { getServerSession } from "next-auth";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";
import Link from 'next/link';
import Image from "next/image";
import Header from "@/components/header";
import Upload from "./upload.jsx";
import Edit from "./edit.jsx";
import deleteItem from "./deleteItem.js";
import DeleteButton from "./deletebutton.jsx";

export const revalidate = 0
export const dynamic = "force-dynamic"

export default async function page({params}) {
    const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');
    let record
    const rando = Math.random()
    record = await pb.collection('items').getOne(params.edit)
    console.log(record)
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
    const settings = await pb.collection('settings').getOne('bussiness__data')

    return(
        <div className="flex flex-col w-full scrollbar-thin">
            <Header settings={settings} redirectBack={'/adminpanel'} title="Edit item"  isLogged={user?.user !== undefined?true:false} profileImage={user?.user.image || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}/>
            <div className="flex justify-between w-full p-[4%]">

            {/* <form action={deleteItem} className="py-1 px-4 flex justify-center items-center bg-red-500 text-white font-semibold rounded-md transition-all hover:bg-red-600">
                <button type="submit">Delete</button>
                <input type="text" value={record.id} name="itemid" className="hidden"/>
            </form> */}
            <DeleteButton record={record} deleteItem={deleteItem}/>
            
            </div>
            <Upload record={record}/>
            <Edit record={record}/>
        </div>
    )
}
