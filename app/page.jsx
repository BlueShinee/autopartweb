import Image from "next/image";
import Header from "@/components/header";
import Slideshow from '@/components/slideshow'
import Catagories from "@/components/catagories";
import Itemlisting from "@/components/itemlisting";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react"

export default async function Home() {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const user = await getServerSession()
      
  if (user?.user !== undefined) {
    const record = await pb.collection('users').getFullList()
    let registered = false
    record.map((v,i)=>{
      if (v.email == user.user.email) {
        registered = true
      }
      console.log(registered);
    })
    if (!registered) {
      redirect("/register")
    }
  } 


  return (
    <>
      <Header/>
      <Slideshow src1="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
      
      src2="https://i.pinimg.com/originals/bd/ec/ea/bdecea0788a51112bd9355850f1b1697.jpg"

      src3="https://wallpapersmug.com/download/1600x900/ba8e68/clean-lake-mountains-range-trees-nature-4k.jpg"
      />
      <Catagories />
      <Itemlisting />
    </>
  )
}
