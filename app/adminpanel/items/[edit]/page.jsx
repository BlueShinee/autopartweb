
import { getServerSession } from "next-auth";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";
import Link from 'next/link';
import Image from "next/image";

import Upload from "./upload.jsx";
import Edit from "./edit.jsx";

export default async function page({params}) {
    const pb = new PocketBase('http://127.0.0.1:8090');
    let record


        const rando = Math.random()
        record = await pb.collection('items').update(params.edit,{"itemid":rando});



    
    return(
        <div className="flex flex-col w-full scrollbar-thin">
            <div className="flex justify-between w-full p-[4%]">

            <Link href={"/adminpanel/items"} className="flex justify-center items-center py-1    hover:bg-blue-500 transition-all active:scale-95   px-4 bg-blue-400 w-24 rounded-md"><span className="text-white font-medium text-lg">Back</span><Image src={"/back-arrow.svg"}  width={20} height={20}/></Link>
            
            </div>
            <Upload record={record}/>
            <Edit record={record}/>
        </div>
    )
}
