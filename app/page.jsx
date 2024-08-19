"use client"

import Image from "next/image";
import Navbar from "@/components/navbar"
import Contactmenu from "@/components/contactmenu"
import Slideshow from '@/components/slideshow'
import Catagories from "@/components/catagories";
import Itemlisting from "@/components/itemlisting";
import { useState } from "react";

export default function Home() {

  let [Contactmenustate , Contactmenustatechange] = useState(false)

  return (
    <>
      <Contactmenu Contactmenustate={Contactmenustate} menufunc={Contactmenustatechange}/>
      <Navbar brandname="Bus Part Motors" /*max character width of 15ch*/ /* Contactmenustate={Contactmenustate} */ menufunc={Contactmenustatechange}/>

      <Slideshow src1="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
      
      src2="https://i.pinimg.com/originals/bd/ec/ea/bdecea0788a51112bd9355850f1b1697.jpg"

      src3="https://wallpapersmug.com/download/1600x900/ba8e68/clean-lake-mountains-range-trees-nature-4k.jpg"
      />
      <Catagories />
      <Itemlisting />
    </>
  )
}
