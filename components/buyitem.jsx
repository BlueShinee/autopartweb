"use client"
//components/buyitems.jsx
import {useState} from "react"
import Swal from "sweetalert2"
import placeOrder from "./placeOrder"
import { redirect } from "next/navigation";
import Payment from "./makePayment";

export default function BuyNowAction({user, itemid, item, settings, userdata}){

    if (user == null) {
        redirect("/api/auth/signin")
    }


    const handleBuyNowClick = () => {
        const formElement = document.getElementById('buy_item_data_form');
      
        /* if (formElement && formElement.tagName === 'FORM') {
          const formData = new FormData(formElement);
          const a = formData.get('address')
          
          // Log FormData key-value pairs
          for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          } */
          
          Swal.fire({
            title: `<strong>${item.name}</strong>`,
            text: 'Are you sure you want to place this order? Total is ' + document.getElementById('totalPriceDisplay').value,
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
                setTimeout(() => {
                  resolve();
                }, 1000);
              });
            }
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                await Payment({
                    user,
                    itemid,
                    quantity: document.getElementById('quantity').value,
                    address: userdata["address"],
                    phone: userdata['whatsapp_number']
                });
              } catch (error) {
                console.error('Payment error:', error);
              }
            }
          });
      
        /* } else {
          console.error('Form element not found or is not a form');
        } */
      };
      
    
    return (
        <>
        <form id={"buy_item_data_form"} /* action={placeOrder} */ className="max-w-[600px] flex flex-col p-4 w-full overflow-hidden">
            <span className="text-sm text-gray-500 font-medium mt-4">Adress</span>
            <input type="text" disabled name="address" defaultValue={userdata["address"]} className="border-0 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>

            <span className="text-sm text-gray-500 font-medium mt-4">Phone</span>
            <input type="text" name="phone" disabled defaultValue={userdata['whatsapp_number']} className="border-0 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none" required/>

            <span className="text-sm text-gray-600 font-medium mt-4">Total</span>
            <input id={"totalPriceDisplay"} type="text" disabled name="total" defaultValue={"LKR "+(item.discount_price > 0 ? item.discount_price : item.price)+".00"} className="border-1 border-gray-500 rounded-md p-1 focus:border-blue-500 outline-none" required/>
            
            <span className="text-sm text-gray-500 font-medium mt-4">Quantity</span>
            <input type="number" id={'quantity'} name="quantity" defaultValue={1} onChange={(e)=>{
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
        {/* <b onClick={()=> {
            const formData = new FormData(document.getElementById('buy_item_data_form'))
            placeOrderClick(formData)
        }} className="w-[90%] md:w-[300px] flex justify-center items-center py-4 m-2 ml-5 hover:bg-green-700 transition-all active:scale-95   px-4 bg-green-500 w-55 rounded-md"><span className="text-white font-medium text-lg mr-2"><i className="fas fa-shopping-cart px-2"></i> BUY NOW</span></b> */}
        {/* <Payment user={user} itemid={itemid} formData={new FormData(document.getElementById('buy_item_data_form'))}/> */}
        
        <button onClick={handleBuyNowClick} className="w-[90%] md:w-[300px] flex justify-center items-center py-4 m-2 ml-5 hover:bg-green-700 transition-all active:scale-95 px-4 bg-green-500 w-55 rounded-md">
            <span className="text-white font-medium text-lg mr-2">
            <i className="fas fa-shopping-cart px-2"></i> PLACE ORDER
            </span>
        </button>
      <br /><br />
        </>
    )
}
