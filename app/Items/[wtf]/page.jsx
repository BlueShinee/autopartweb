import Item from "@/components/item";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import PocketBase from 'pocketbase';
import { getServerSession } from "next-auth";
import placeOrder from "@/components/placeOrder";

export const revalidate = 0
export const dynamic = "force-dynamic"

export default async function page({params}) {
    const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');
    const settings = await pb.collection('settings').getOne('bussiness__data')
    const user = await getServerSession()
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
            <Item params={params} user={user} isLogged={registered} placeOrder={placeOrder}/>
        </>
    )

   
}