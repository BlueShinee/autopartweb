"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Contactmenu from "@/components/contactmenu"

export default function header(props) {
    
    let [Contactmenustate , Contactmenustatechange] = useState(false)

  return (
    <>
    
    <Contactmenu Contactmenustate={Contactmenustate} menufunc={Contactmenustatechange}/>
    <Navbar profileImage={props.profileImage} brandname="Thushara Auto Parts" /*max character width of 15ch*/ /* Contactmenustate={Contactmenustate} */ menufunc={Contactmenustatechange} user={props.user}/>

    </>
  )
}
