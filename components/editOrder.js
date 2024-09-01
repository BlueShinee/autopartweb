"use server"

import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";

async function ECMail({number, text, footer, orderUrl, isDelivered}){
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
                        text: isDelivered ? "Discover More Items" : 'View Order',
                        url: isDelivered ? process.env.NEXTAUTH_URL :  orderUrl || process.env.NEXTAUTH_URL
                    }
                ],
                footer
            }
        })
        })
        .then(response => response.json())
        .then(data => {
            return
        })
}

async function setOrderState({orderid, state, user}){
    const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090')
    const record = {
        "state": state
    };
    let ECM_message = ''
    if(state === 'delete'){
        const updated = await pb.collection('orders').getOne(orderid)
        const deleted = await pb.collection('orders').delete(orderid)
        if(!deleted){return}
        console.log(updated)
        const item = await pb.collection('items').getOne(updated.itemid)
        let userdata = await pb.collection('users').getList(1, 50, {
            filter: `email = "${user.user.email}"`,
        })
        userdata = userdata.items[0]
        const settings = await pb.collection('settings').getOne('bussiness__data')
        ECM_message = 
    `⭐ \`Order Delivered\`
    
    *${item.name}*
    Your order has been successfully delivered.
    Than you!
    
    - Placed - ${new Date(updated.created).toDateString()}
    - Delivered - ${new Date(updated.updated).toDateString()}
    `
    
        await ECMail({
            number: String(userdata['whatsapp_number']).startsWith('7') ? '94'+userdata['whatsapp_number'] : userdata['whatsapp_number'],
            text: ECM_message,
            footer: settings.name,
            orderUrl: `${process.env.NEXTAUTH_URL || `http://localhost:3000`}/cart/${updated.id}`,
            isDelivered: (state === 'delivered')
        })
        return
    }
    const settings = await pb.collection('settings').getOne('bussiness__data')
    const updated = await pb.collection('orders').update(orderid, record)
    const item = await pb.collection('items').getOne(updated.itemid)
    let userdata = await pb.collection('users').getList(1, 50, {
        filter: `email = "${user.user.email}"`,
    })
    userdata = userdata.items[0]
    if(state === 'ontheway'){
        ECM_message = 
`✅ \`Order Confirmed\`

*${item.name}*
Your order is on the way. It may takes few days for delivery.

- Order id - ${updated.id}
- Placed - ${new Date(updated.created).toDateString()}
- Confirmed - ${new Date(updated.updated).toDateString()}
- Address - ${userdata.address}
`
    }else if(state === 'rejected'){
        ECM_message = 
`❌ \`Order Rejected\`

*${item.name}*
Your order has been rejected due to a problem. Contact help center for more informations. Thank you.

- Order id - ${updated.id}
- Placed - ${new Date(updated.created).toDateString()}
- Rejected - ${new Date(updated.updated).toDateString()}
`
    }else if(state === 'pending'){
        ECM_message = 
`🕒 \`Order is Pending\`

*${item.name}*
Your order will confirm later.

- Order id - ${updated.id}
- Placed - ${new Date(updated.created).toDateString()}
- Rejected - ${new Date(updated.updated).toDateString()}
`
    }else if(state === 'delivered'){
        ECM_message = 
`⛔ \`Order Deleted\`

*${item.name}*
Your order has been deleted.

- Placed - ${new Date(updated.created).toDateString()}
- Delivered - ${new Date(updated.updated).toDateString()}
`
    }
    
    await ECMail({
        number: String(userdata['whatsapp_number']).startsWith('7') ? '94'+userdata['whatsapp_number'] : userdata['whatsapp_number'],
        text: ECM_message,
        footer: settings.name,
        orderUrl: `${process.env.NEXTAUTH_URL || `http://localhost:3000`}/cart/${updated.id}`,
        isDelivered: (state === 'delivered')
    })
    redirect('/adminpanel/orders/'+state)
}

export default setOrderState
