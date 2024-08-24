import Item from "@/components/item";
import { redirect } from "next/navigation";


export const dynamic = 'force-dynamic';
export const revalidate = 1

export default async function page({params}) {
    
    return(
        <>
        <Item params={params}/>
        </>
    )

   
}