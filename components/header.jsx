"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Contactmenu from "@/components/contactmenu"

export default function header() {
    
    let [Contactmenustate , Contactmenustatechange] = useState(false)

  return (
    <>
    
    <Contactmenu Contactmenustate={Contactmenustate} menufunc={Contactmenustatechange}/>
    <Navbar brandname="Bus Part Motors" /*max character width of 15ch*/ /* Contactmenustate={Contactmenustate} */ menufunc={Contactmenustatechange}/>

    </>
  )
}
