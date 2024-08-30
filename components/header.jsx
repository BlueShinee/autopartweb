"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Contactmenu from "@/components/contactmenu"

export default function header(props) {
    let redirectBack = props.redirectBack ? props.redirectBack : false
    let [Contactmenustate , Contactmenustatechange] = useState(false)

  return (
    <>
    <Contactmenu Contactmenustate={Contactmenustate} menufunc={Contactmenustatechange}/>
    <Navbar redirectBack={redirectBack} profileImage={props.profileImage} isAdmin={props.isAdmin} isLogged={props.isLogged} brandname={ props.title || "Powered By Evelocore"} /*max character width of 15ch*/ /* Contactmenustate={Contactmenustate} */ menufunc={Contactmenustatechange} user={props.user}/>
    </>
  )
}

