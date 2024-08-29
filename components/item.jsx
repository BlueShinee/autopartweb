
import PocketBase from "pocketbase"
import Link from 'next/link';
import Image from "next/image";
import Items2 from "@/components/items2"
import BuyNowAction from "./buyNowClick";

export const revalidate = 1

export default async function item(props) {
    const pb = new PocketBase('http://127.0.0.1:8090');
    const itemid = props.params.wtf
    const rando = Math.random()
    const record = await pb.collection('items').update(itemid,{"itemid":rando})
    const settings = await pb.collection('settings').getOne('bussiness__data')
    const records = await pb.collection('users').getFullList()
    const photos = record.urls

    return (
        <>
        <Link href={"/"} className="flex justify-center items-center py-1 m-2 ml-5 hover:bg-blue-500 transition-all active:scale-95   px-4 bg-blue-400 w-24 rounded-md"><span className="text-white font-medium text-lg mr-2">Back</span><Image src={"/back-arrow.svg"}  width={20} height={20}/></Link>
        <div className="flex flex-col md:flex-row items-start">
            <div className="w-full flex flex-col justify-center items-center">
                <Items2 photoURL={photos} record={record} photos={photos}/>
            </div>
            <div className="w-full flex flex-col items-start mt-4">
                <span className="ml-6 mb-1 font-semibold text-2xl line-clamp-2 drop-shadow-lg">{record.name}</span>
                <span className="ml-6 mb-4 text-xl font-semibold text-blue-600 drop-shadow-lg">{record.discount_price > 0 ? (<><s className='text-red-400 text-xs'>RS. {record.price}/=</s> <i className='text-gray-400 text-xs'> {Math.round(((record.price - record.discount_price) / record.price) * 100)}% discount</i><br/>Rs.{record.discount_price} /=</>) : (<>Rs.{record.price} /=</>)}</span>
                <span className="ml-6 ">Model : {record.model}</span>
                <span className="ml-6 mb-6">Category : {record.type}</span>
                <span className="ml-6 mr-6 font-medium leading-5 mb-3">{record.big_desc["st-paragraph"]}</span>
                <ul className="ml-6 mb-3">
                    {record.big_desc['buletlist'].map((v,i)=>{
                        return <li>- {v}</li>
                    })}
                </ul>
                <span className="ml-6 mr-6 font-medium leading-5 mb-3">{record.big_desc["end-paragraph"]}</span>
                {props.isLogged == true ? (
                    <BuyNowAction settings={settings} records={records} user={props.user} itemid={itemid} item={record} style={{display: props.isLogged ? 'flex' : 'none'}}/>
                ) : (
                    <Link href={"/api/auth/signin"} style={{display: !props.isLogged ? 'flex' : 'none'}} onClick={null} className="flex justify-center items-center py-4 m-2 ml-5 hover:bg-blue-700 transition-all active:scale-95   px-4 bg-blue-500 w-55 rounded-md"><span className="text-white font-medium text-lg mr-2"><i className="fas fa-user px-2"></i> Sign In</span></Link>
                )}
                <br/><br/><br/><br/>
            </div>
        </div>
        </>
    )
}