"use client"

import { useState,useRef } from "react"
import save_number from "./actions"
import { redirect } from "next/navigation"
import save_address from "./save_address"

export default function editable(props) {

    const addinput = useRef(null)
    const numberinput = useRef(null)

    


  return (
    <>
    <form action={save_number} className="flex flex-col w-[90%] mt-12 mb-8 transition-all">
        <div className="flex justify-between"><span className="text-sm text-gray-600 font-medium">Whatsapp Number</span><button className="font-semibold text-blue-600 hover:text-red-600 transition-all" type="button" onClick={(e)=>{

            if (e.target.innerText == "Edit") {
                numberinput.current.disabled = false;e.target.innerText="Save";e.target.style.color ="green";
            }else{
                e.target.type="submit"
            }
            
        }}>Edit</button></div>




        <input type="number" name="WAnumber" placeholder={props.number} disabled  className={`py-3 font-medium rounded-md px-4 my-2 border-2 border-gray-400`} ref={numberinput}/>
    </form>

    <form action={save_address} className="flex flex-col w-[90%] transition-all">
        <div className="flex justify-between"><span className="text-sm text-gray-600 font-medium">Address</span><button className="font-semibold text-blue-600 hover:text-red-600" type="button" onClick={(e)=>{

            if (e.target.innerText == "Edit") {
                addinput.current.disabled = false;e.target.innerText="Save";e.target.style.color ="green"
            }else{
                e.target.type="submit"
            }
            

        }}>Edit</button></div>
        
        <input type="text" name="address" placeholder={props.address} ref={addinput} disabled className={`py-3 font-medium rounded-md px-4 my-2 border-2 border-gray-400`}/>

        
    </form>
    </>
  )
}
