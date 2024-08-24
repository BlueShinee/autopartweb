@ -1,42 +0,0 @@
import PocketBase from "pocketbase"
import Link from 'next/link';
import Image from "next/image";
import Items2 from "@/components/items2"

export default async function item(props) {
    const pb = new PocketBase('http://127.0.0.1:8090');
    const itemid = props.params.wtf
    const records = await pb.collection('items').getFullList({
        sort: '-created'
    })
    let record
    records.map((v,i)=>{
        if (v.id == itemid) {
            record = v
        }
    })
    const photos = record.urls


    return (
        <div className="flex flex-col">
            <Link href={"/"} className="flex justify-center items-center py-1 m-2 ml-5 hover:bg-blue-500 transition-all active:scale-95   px-4 bg-blue-400 w-24 rounded-md"><span className="text-white font-medium text-lg mr-2">Back</span><Image src={"/back-arrow.svg"}  width={20} height={20}/></Link>
            <div className="w-full flex flex-col justify-center items-center">
                <Items2 photoURL={photos} record={record} photos={photos}/>
            </div>
            <div className="w-full flex flex-col items-start mt-4">
                <span className="ml-6 mb-1 font-semibold text-2xl line-clamp-2 drop-shadow-lg">{record.name}</span>
                <span className="ml-6 mb-4 text-xl font-semibold text-blue-600 drop-shadow-lg">Rs.{record.price} /=</span>
                <span className="ml-6 ">Model : {record.model}</span>
                <span className="ml-6 mb-6">Type : {record.type}</span>
                <span className="ml-6 mr-6 font-medium leading-5 mb-3">{record.big_desc["st-paragraph"]}</span>
                <ul className="ml-6 mb-3">
                    {record.big_desc['buletlist'].map((v,i)=>{
                        return <li>- {v}</li>
                    })}
                </ul>
                <span className="ml-6 mr-6 font-medium leading-5 mb-3">{record.big_desc["end-paragraph"]}</span>
            </div>
        </div>
    )
}