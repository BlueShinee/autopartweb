import Item from "@/components/item";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import PocketBase from 'pocketbase';


export const dynamic = 'force-dynamic';
export const revalidate = 1

export default async function page({params}) {
    const pb = new PocketBase('http://127.0.0.1:8090');
    const settings = await pb.collection('settings').getOne('bussiness__data')
    
    return(
        <>
        <Header title={settings.name} isLogged={false} profileImage={ "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}/>
        <Item params={params}/>
        </>
    )

   
}