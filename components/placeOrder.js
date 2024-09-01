"use server"

import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";

async function ECMail({number, text, footer, orderUrl}){
    console.log(orderUrl)
    fetch('https://ecmail.noerror.studio/whatsapp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: "sendMessage",
            token: "NugFY248kaDfpKI7NQ2gJECjN4Q2FFrf",
            data: {
                number,
                text,
                image: "",
                buttons: [
                    {
                        type: 'url',
                        text: 'View Order',
                        url: orderUrl || process.env.NEXTAUTH_URL
                    }
                ],
                footer
            }
        })
        })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

export default async function placeOrder({user, itemid, quantity, address, phone}){
    const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');
    const settings = await pb.collection('settings').getOne('bussiness__data')
    const item = await pb.collection('items').getOne(itemid)
    const record = await pb.collection('users').getFullList()
    const OrderId = Math.floor(Math.random()*1000000)+1
    
    const data = {
        "orderid": OrderId,
        "userid": '',
        "email": user.user.email,
        "itemid": itemid,
        "quantity": quantity,
        "price": (item.discount_price > 0 ? item.discount_price : item.price) * quantity,
        "state": "pending"
    }
    
    record.map((v,i)=>{
      if (v.email == user.user.email) {
        data.userid = v.id
      }
    })

    const order = await pb.collection('orders').create(data)
    
    ECMail({
        number: String(phone).startsWith('7') ? '94'+phone : phone,
        text:
`🕒 \`Order Placed\`

*${item.name}*
${item.desc}

- Quantity - ${quantity}
- Total - LKR ${(item.discount_price > 0 ? item.discount_price : item.price) * quantity}.00
- Address - ${address}
- Order id - ${order.id}
`,
        footer: settings.name,
        orderUrl: `${process.env.NEXTAUTH_URL || `http://localhost:3000`}/cart/${order.id}`
    })
    return order
}
