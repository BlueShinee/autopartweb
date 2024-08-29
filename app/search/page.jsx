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
      <Slideshow
        src1={settings.slider_1}
        src2={settings.slider_2}
        src3={settings.slider_3}
        location_embed ={settings.location_embed}
      />
      <SearchForm isEditing={false}/>
      <Footer settings={settings}/>
    </>
  )
}