import Image from "next/image";
import Header from "@/components/header";
import Slideshow from '@/components/slideshow'
import Catagories from "@/components/catagories";
import Itemlisting from "@/components/itemlisting";
import { getServerSession } from "next-auth";

export default async function Home() {
  let user = await getServerSession()

  return (
    <>
      <Header user={user}/>
      <Slideshow src1="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
      
      src2="https://i.pinimg.com/originals/bd/ec/ea/bdecea0788a51112bd9355850f1b1697.jpg"

      src3="https://wallpapersmug.com/download/1600x900/ba8e68/clean-lake-mountains-range-trees-nature-4k.jpg"
      />
      <Catagories />
      <Itemlisting />
    </>
  )
}
