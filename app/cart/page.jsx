import Header from "@/components/header";
import PocketBase from 'pocketbase';
import { getServerSession } from "next-auth";
import Cart from "@/components/cart";
import Footer from "@/components/Footer";


export const dynamic = 'force-dynamic';
export const revalidate = 0

export default async function page() {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const settings = await pb.collection('settings').getOne('bussiness__data');
  const orders = await pb.collection('orders').getFullList({
    sort: '-created',
});
  const user = await getServerSession();
  let mycart = [];

  if (user?.user !== undefined) {
      for (const order of orders) {
          if (order.email === user.user.email) {
              const item = await pb.collection('items').getOne(order.itemid)
              order.itemName = item.name
              order.itemDesc = item.desc
              mycart.push(order)
          }
      }
  }

  return (
      <>
          <Header redirectBack={'/'} title={"Cart"} isLogged={user?.user !== undefined} profileImage={user?.user.image || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"} />
          <Cart mycart={mycart} user={user} isLogged={user?.user !== undefined} />
          <Footer settings={settings} />
      </>
  )
}
