
import PocketBase from "pocketbase"
import Link from 'next/link';
import Image from "next/image";
import Items2 from "@/components/items2"
import BuyNowAction from "./buyitem";

export const revalidate = 0

export default async function item(props) {
    const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090')
    const itemid = props.params.itemid
    const record = await pb.collection('items').getOne(itemid)
    //const settings = await pb.collection('settings').getOne('bussiness__data')
    //const records = await pb.collection('users').getFullList()
    const photos = record.urls

    return (
        <>
        <div className="flex flex-col md:flex-row items-start">
            <div className="w-full flex flex-col justify-center items-center">
                <Items2 photoURL={photos} record={record}/>
            </div>
            <div className="w-full flex flex-col items-start mt-4">
                <span className="ml-6 mb-1 font-semibold text-2xl line-clamp-2 drop-shadow-lg">{record.name}</span>
                <span className="ml-6 mb-4 text-xl font-semibold text-blue-600 drop-shadow-lg">{record.discount_price > 0 ? (<><s className='text-red-400 text-xs'>RS. {record.price}/=</s> <i className='text-gray-400 text-xs'> {Math.round(((record.price - record.discount_price) / record.price) * 100)}% discount</i><br/>Rs.{record.discount_price} /=</>) : (<>Rs.{record.price} /=</>)}</span>
                <span className="ml-6 ">Model : {record.model}</span>
                <span className="ml-6 mb-6">Category : {record.type}</span>
                {record.avalable == false ? (
                    <span className="ml-6 mb-6 text-red-500">This item currently unavalable in stock!</span>
                ):(null)}
                {props.get === 'full' ? (
                    <>
                        <span className="ml-6 mr-6 font-medium leading-5 mb-3">{record.big_desc["st-paragraph"]}</span>
                        <ul className="ml-6 mb-3">
                            {record.big_desc['buletlist'].map((v,i)=>{
                                return <li>- {v}</li>
                            })}
                        </ul>
                        <span className="ml-6 mr-6 font-medium leading-5 mb-3">{record.big_desc["end-paragraph"]}</span>
                        <Link href={"/buynow/"+itemid} className="w-[90%] md:w-[300px] flex justify-center items-center py-4 m-2 ml-5 hover:bg-green-700 transition-all active:scale-95   px-4 bg-green-500 w-55 rounded-md"><span className="text-white font-medium text-lg mr-2"><i className="fas fa-shopping-cart px-2"></i> BUY NOW</span></Link>
                    </>
                ):(
                    <BuyNowAction /* placeOrderClick={placeOrderClick} */ settings={props.settings} userdata={props.userdata} user={props.user} itemid={itemid} item={record} style={props.style}/>
                )}
            </div>
        </div>
        <br /><br />
        </>
    )
}
