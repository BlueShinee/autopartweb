
import PocketBase from 'pocketbase';

export default async function payToOrder({orderid}){
    const order = await pb.collection('orders').update(orderid, {payment: true})
    return order
}