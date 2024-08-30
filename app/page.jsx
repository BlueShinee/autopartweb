import Image from "next/image";
import Header from "@/components/header";
import Slideshow from '@/components/slideshow'
import Itemlisting from "@/components/itemlisting";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Searchbar from "@/components/searchbar";
import Footer from '@/components/Footer'

export const revalidate = 0
export const dynamic = "force-dynamic"

export default async function Home() {
  console.log(process.env.POCKETBASE_URL)
  const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090')
  const itemsdb = await pb.collection("items").getFullList()
  const settings = await pb.collection('settings').getOne('bussiness__data')
  const user = await getServerSession()
  let registered = false 
  let userdata = {}
      
  if (user?.user !== undefined) {
    const record = await pb.collection('users').getFullList()
    record.map((v,i)=>{
      if (v.email == user.user.email) {
        registered = true
        userdata = v
      }
    })
    if (!registered) {
      redirect("/register")
    }
  }
  
  return (
    <>
      <Header settings={settings} title={settings.name} isAdmin={userdata["is_admin"]} isLogged={user?.user !== undefined?true:false} profileImage={user?.user.image || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}/>
      <Slideshow 
        src1={settings.slider_1}
        src2={settings.slider_2}
        src3={settings.slider_3}
        location_embed ={settings.location_embed}
        /* src1="https://st2.depositphotos.com/1005404/7746/i/450/depositphotos_77466908-stock-photo-car-parts.jpg"
        src2="https://www.valueresearchonline.com/content-assets/images/53124_auto-parts__w660__.webp"
        src3="https://di-uploads-pod14.dealerinspire.com/toyotaoforlando/uploads/2019/04/car-parts-1024x683.jpg" */
      />
      <Searchbar/>
      <Itemlisting records={itemsdb} title="Populer Products"/>
      <Footer settings={settings}/>
    </>
  )
}
