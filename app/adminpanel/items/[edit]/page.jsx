
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

export default async function page({params}) {
    const pb = new PocketBase('http://127.0.0.1:8090');
    let record
    const rando = Math.random()
    record = await pb.collection('items').update(params.edit,{"itemid":rando})

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

    return(
        <div className="flex flex-col w-full scrollbar-thin">
            <Header title="Edit item"  isLogged={user?.user !== undefined?true:false} profileImage={user?.user.image || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}/>
            <div className="flex justify-between w-full p-[4%]">

            <Link href={"/adminpanel"} className="flex justify-center items-center py-1    hover:bg-blue-500 transition-all active:scale-95   px-4 bg-blue-400 w-24 rounded-md"><span className="text-white font-medium text-lg">Back</span><Image src={"/back-arrow.svg"}  width={20} height={20}/></Link>

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
