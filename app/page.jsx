"use client"

import Image from "next/image";
import Navbar from "@/components/navbar"
import Contactmenu from "@/components/contactmenu";
import { useState } from "react";

export default function Home() {

  let [Contactmenustate , Contactmenustatechange] = useState(false)

  return (
    <>
      <Contactmenu Contactmenustate={Contactmenustate} menufunc={Contactmenustatechange}/>
      <Navbar brandname="Bus Part Motors" /*max character width of 15ch*/ /* Contactmenustate={Contactmenustate} */ menufunc={Contactmenustatechange}/>
    </>
  )
}
