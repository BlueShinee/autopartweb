import Item from "@/components/item";


export const dynamic = 'force-dynamic';

export default async function page({params}) {
    
    return(
        <>
        <Item params={params}/>
        </>
    )

   
}
