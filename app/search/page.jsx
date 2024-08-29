import Image from "next/image";
import Header from "@/components/header";
import Slideshow from '@/components/slideshow'
import Catagories from "@/components/catagories";
import Itemlisting from "@/components/itemlisting";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react"
import SearchForm from "@/app/search/searchform";
import Footer from "@/components/Footer";

export const revalidate = 5

export default async function Home() {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const user = await getServerSession()
  const settings = await pb.collection('settings').getOne('bussiness__data')
  let isLogged = false
      
  if (user?.user !== undefined) {
    const record = await pb.collection('users').getFullList()
    record.map((v,i)=>{
      if (v.email == user.user.email) {
        isLogged = true
      }
    })
    if (!isLogged) {
      redirect("/register")
    }
  }
  

  return (
    <>
    <Header title={settings.name} isLogged={isLogged} profileImage={user?.user.image || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}/>
      <Slideshow src1="https://st2.depositphotos.com/1005404/7746/i/450/depositphotos_77466908-stock-photo-car-parts.jpg"
      
      src2="https://www.valueresearchonline.com/content-assets/images/53124_auto-parts__w660__.webp"

      src3="https://di-uploads-pod14.dealerinspire.com/toyotaoforlando/uploads/2019/04/car-parts-1024x683.jpg"
      />
      <SearchForm isEditing={false}/>
      <Footer name={settings.name}/>
    </>
  )
}