import PocketBase from "pocketbase"
import Header from "@/components/header";
import Link from 'next/link';
import Image from "next/image";

export default async function page({params}) {
    const pb = new PocketBase('http://127.0.0.1:8090');
    const record = await pb.collection('items').getOne(params.itemid)
    return (
        <div className="flex flex-col">
            <Link href={"/"} className="flex justify-center items-center py-1 m-2 hover:bg-blue-500 transition-all active:scale-95   px-4 bg-blue-400 w-24 rounded-md"><span className="text-white font-medium text-lg mr-2">Back</span><Image src={"/back-arrow.svg"}  width={20} height={20}/></Link>
            {record.name}
        </div>
    )
}
