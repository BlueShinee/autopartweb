import Item from "@/components/item";
import { redirect } from "next/navigation";
import Header from "@/components/header";


export const dynamic = 'force-dynamic';
export const revalidate = 1

export default async function page({params}) {
    
    return(
        <>
        <Header  isLogged={false} profileImage={ "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}/>
        <Item params={params}/>
        </>
    )

   
}