"use client"

import {useState} from "react"
import Swal from "sweetalert2"
import placeOrder from "./placeOrder"
import { redirect } from "next/navigation";

export default function BuyNowAction({style, user, itemid, item, settings, records}){
    console.log("ITEM ID "+ itemid)
    const [buyNowDataWindow, setBuyNowDataWindow] = useState(false)

    if (user == null) {
        redirect("/api/auth/signin")
    }

    let userdata
    records.map((v,i)=>{
        if (v.email === user.user.email) {
            userdata = v
        }
    })

    async function placeOrderClick(formData){
        const quantity = formData.get('quantity')
        const address = userdata["address"]
        const total = formData.get('total') || document.getElementById('totalPriceDisplay').value

        Swal.fire({
            title: `<strong>${item.name}</strong>`,
            text: 'Are you sure you want to place this order? Total is '+total,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            customClass: {
                title: 'swal-title',
                text: 'swal-text'
            },
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return new Promise((resolve) => {
                    // Simulate a delay (e.g., API call) here if needed
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                placeOrder({ user, itemid, quantity, item, address, phone:userdata['whatsapp_number'] })
            }
        });
    }
    
    return (
        <>
        <form id={"buy_item_data_form"} style={{height: buyNowDataWindow ? '100%' : '0px'}} action={placeOrder} className="flex flex-col p-4 w-full overflow-hidden">
            <span className="text-sm text-gray-500 font-medium mt-4">Item</span>
            <input type="text" disabled defaultValue={item.name} className="border-0 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>

            <span className="text-sm text-gray-500 font-medium mt-4">Adress</span>
            <input type="text" disabled name="address" defaultValue={userdata["address"]} className="border-0 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>

            <span className="text-sm text-gray-500 font-medium mt-4">Phone</span>
            <input type="text" disabled defaultValue={userdata['whatsapp_number']} className="border-0 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>

            <span className="text-sm text-gray-600 font-medium mt-4">Total</span>
            <input id={"totalPriceDisplay"} type="text" disabled name="total" defaultValue={"LKR "+(item.discount_price > 0 ? item.discount_price : item.price)+".00"} className="border-1 border-gray-500 rounded-md p-1 focus:border-blue-500 outline-none" required/>
            
            <span className="text-sm text-gray-500 font-medium mt-4">Quantity</span>
            <input type="number" name="quantity" defaultValue={1} onChange={(e)=>{
                if(e.target.value > Number(settings.buy_max_quantity)){
                    e.target.value = settings.buy_max_quantity
                    Swal.fire({
                        icon:'error',
                        title: 'Can\'t buy more than ' + settings.buy_max_quantity
                    })
                }
                if(e.target.value < 1){
                    e.target.value == ''
                    Swal.fire({
                        icon:'error',
                        title: 'Can\'t buy 0 ammount'
                    })
                }
                document.getElementById('totalPriceDisplay').value = "LKR "+(item.discount_price > 0 ? item.discount_price : item.price)*(e.target.value)+".00"}
            } className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>
            
        </form>
        <b style={style} onClick={()=> {
            if(buyNowDataWindow){
                const formData = new FormData(document.getElementById('buy_item_data_form'))
                placeOrderClick(formData)
            }else{
                setBuyNowDataWindow(true)
            }
        }} className="flex justify-center items-center py-4 m-2 ml-5 hover:bg-green-700 transition-all active:scale-95   px-4 bg-green-500 w-55 rounded-md"><span className="text-white font-medium text-lg mr-2"><i className="fas fa-shopping-cart px-2"></i> BUY NOW</span></b>
        </>
    )
}
