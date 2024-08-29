"use server"


import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";


export default async function searching(input, category){
        
    const pb = new PocketBase('http://127.0.0.1:8090');

    const records = await pb.collection('items').getFullList({
        sort: '-created',
    });
    let serachInput = input.split(" ")
    let resultPool = []

    records.map((v,i)=>{
        let ar1 = (v.name).split(" ")
        let ar2 = [v.model,v.type]
        let Category = v.type
        let temp = ar1.concat(ar2)
        temp.map((value,index)=>{
            temp[index] = value.toLowerCase()
        })
        if(Category == category){
            serachInput.map((vv,ii)=>{
                if (temp.includes(vv.toLowerCase())) {
                    if (!resultPool.includes(v)) {
                        resultPool.push(v)
                    }
                }
            })
        }
        
    })
    
    return(resultPool)
}



/*   {
    big_desc: {
      buletlist: [Array],
      'end-paragraph': 'get him today he is one of a kind',
      'st-paragraph': 'This is one of a kind , only on into the whole world so get him today at a cheap price of Rs.10/='
    },
    collectionId: 'bfh80zq13hn96yq',
    collectionName: 'items',
    created: '2024-08-24 02:07:14.795Z',
    desc: 'Vimukthi for sale',
    discount_price: 20,
    id: 'pdlnkza2ps0rhi7',
    itemid: 0.7820041512129261,
    model: 'human',
    name: 'Vimukthi not for sale',
    price: 10,
    type: 'dumb fuck',
    updated: '2024-08-27 12:06:05.497Z',
    urls: { array: [Array] }
  }
} */
