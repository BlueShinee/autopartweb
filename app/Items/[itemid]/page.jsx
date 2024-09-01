import Item from "@/components/item";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import PocketBase from 'pocketbase';
import { getServerSession } from "next-auth";
import placeOrder from "@/components/placeOrder";
import Link from 'next/link';

export const revalidate = 0
export const dynamic = "force-dynamic"

export default async function page({params}) {
    const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');
    const settings = await pb.collection('settings').getOne('bussiness__data')
    const user = await getServerSession()
    const itemid = params.itemid
    let registered = false 
        
    if (user?.user !== undefined) {
      const record = await pb.collection('users').getFullList()
      record.map((v,i)=>{
        if (v.email == user.user.email) {
          registered = true
        }
      })
      if (!registered) {
        redirect("/register")
      }
    }
    
    return(
        <>
            <Header settings={settings} redirectBack={'/'} title={settings.name} isLogged={user?.user !== undefined?true:false} profileImage={user?.user.image || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}/>
            <Item params={params} user={user} isLogged={registered} get={'full'}/>
            {registered == true ? (
                //{/* <BuyNowAction settings={settings} records={records} user={props.user} itemid={itemid} item={record} style={{display: props.isLogged ? 'flex' : 'none'}}/> */}
                <Link href={"/buynow/"+itemid} className="w-[90%] md:w-[300px] flex justify-center items-center py-4 m-2 ml-5 hover:bg-green-700 transition-all active:scale-95   px-4 bg-green-500 w-55 rounded-md"><span className="text-white font-medium text-lg mr-2"><i className="fas fa-shopping-cart px-2"></i> BUY NOW</span></Link>
            ) : (
                <Link href={"/api/auth/signin"} className="w-[90%] md:w-[300px] flex justify-center items-center py-4 m-2 ml-5 hover:bg-blue-700 transition-all active:scale-95   px-4 bg-blue-500 w-55 rounded-md"><span className="text-white font-medium text-lg mr-2"><i className="fas fa-user px-2"></i> Sign In</span></Link>
            )}
        </>
    )

   
}