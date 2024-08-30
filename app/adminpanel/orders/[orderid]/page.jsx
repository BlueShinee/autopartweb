import Header from "@/components/header";
import PocketBase from 'pocketbase';
import { getServerSession } from "next-auth";
import AdminOrdersItem from "@/components/adminOrdersItem";
import Footer from "@/components/Footer";
export const revalidate = 0


export const dynamic = 'force-dynamic';
export default async function page({params}) {
  const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');
  const settings = await pb.collection('settings').getOne('bussiness__data');
  const orders = await pb.collection('orders').getFullList({
      sort: '-created',
  });
  //const order = await pb.collection('orders').getOne(params.orderid)
  const Rando = Math.floor(Math.random()*1000000)+1
  const order = await pb.collection('orders').update(params.orderid, {orderid: Rando})
  const record = await pb.collection('items').getOne(order.itemid)
  const photos = record.urls
  const user = await getServerSession()
  let mycart = [];
  if (user?.user !== undefined) {
      for (const order of orders) {
          if (order.email === user.user.email) {
            if(order.id === params.orderid){
              const item = await pb.collection('items').getOne(order.itemid)
              order.itemName = item.name
              order.itemDesc = item.desc
              mycart.push(order)
            }
          }
      }
  }

  return (
      <>
          <Header settings={settings} redirectBack={'/adminpanel/orders'} title={"Order Actions"} isLogged={user?.user !== undefined} profileImage={user?.user.image || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"} />
          <AdminOrdersItem mycart={mycart} user={user} isLogged={user?.user !== undefined} photoURL={photos} record={record}/>
          <Footer settings={settings} />
      </>
  )
}