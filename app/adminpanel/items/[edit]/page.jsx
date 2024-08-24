
import { getServerSession } from "next-auth";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";

import Upload from "./upload";

export default async function page({params}) {
    const pb = new PocketBase('http://127.0.0.1:8090');
    let record
    if (params.edit == "create") {
    }else{
        const rando = Math.random()
        record = await pb.collection('items').update(params.edit,{"itemid":rando});
    }


    
    return(
        <div>
            <Upload record={record}/>
        </div>
    )
}
