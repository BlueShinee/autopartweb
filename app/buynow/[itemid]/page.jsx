import Item from "@/components/item";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import PocketBase from 'pocketbase';
import { getServerSession } from "next-auth";
import placeOrder from "@/components/placeOrder";
import Link from 'next/link';
import BuyNowAction from "@/components/buyitem";

export const revalidate = 0
export const dynamic = "force-dynamic"

export default async function page({params}) {
    const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');
    const settings = await pb.collection('settings').getOne('bussiness__data')
    const user = await getServerSession()
    const records = await pb.collection('users').getFullList()
    const itemid = params.itemid
    const record = await pb.collection('items').getOne(itemid)
    let registered = false
    let userdata = await pb.collection('users').getList(1, 50, {
        filter: `email = "${user.user.email}"`,
    })
    userdata = userdata.items[0]
    if (userdata.address) { registered = true }
        
    if (user?.user !== undefined) {
      if(userdata.length > 0){registered = true}
      if (!registered) {
        redirect("/register")
      }
    }
    
    return(
        <>
            <Header settings={settings} redirectBack={'/'} title={settings.name} isLogged={user?.user !== undefined?true:false} profileImage={user?.user.image || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}/>
            <Item settings={settings} userdata={userdata} itemid={itemid} item={record} style={{display: registered ? 'flex' : 'none'}} params={params} user={user} isLogged={registered} get={'head'}/>
            {registered == true ? (
                //{/* <BuyNowAction settings={settings} records={records} user={props.user} itemid={itemid} item={record} style={{display: props.isLogged ? 'flex' : 'none'}}/> */}
                null//<Link href={"/buynow/"+itemid} className="w-[90%] md:w-[300px] flex justify-center items-center py-4 m-2 ml-5 hover:bg-green-700 transition-all active:scale-95   px-4 bg-green-500 w-55 rounded-md"><span className="text-white font-medium text-lg mr-2"><i className="fas fa-shopping-cart px-2"></i> BUY NOW</span></Link>
            ) : (
                <Link href={"/api/auth/signin"} className="w-[90%] md:w-[300px] flex justify-center items-center py-4 m-2 ml-5 hover:bg-blue-700 transition-all active:scale-95   px-4 bg-blue-500 w-55 rounded-md"><span className="text-white font-medium text-lg mr-2"><i className="fas fa-user px-2"></i> Sign In</span></Link>
            )}
        </>
    )

   
}