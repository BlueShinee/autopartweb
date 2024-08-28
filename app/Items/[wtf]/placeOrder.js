
import PocketBase from 'pocketbase';

async function ECMail({number, text, footer, orderUrl}){
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
            console.log(data)
        })
}

export default async function placeOrder({user, itemid, quantity, item, address, phone}){
    const pb = new PocketBase('http://127.0.0.1:8090');
    const settings = await pb.collection('settings').getOne('bussiness__data')
    const OrderId = Math.floor(Math.random()*1000000)+1
    console.log(user, itemid, quantity, item, address, phone)
    await ECMail({
        number: String(phone).startsWith('7') ? '94'+phone : phone,
        text:
`✅ \`Order confirmed\`

*${item.name}*
- Quantity - ${quantity}
- Total - LKR ${(item.discount_price > 0 ? item.discount_price : item.price) * quantity}.00`,
        footer: settings.name,
        orderUrl: `${process.env.NEXTAUTH_URL}/order/${OrderId}`
    })
}