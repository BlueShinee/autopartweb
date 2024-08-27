"use server"


import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";


export default async function searching(input){
        
    const pb = new PocketBase('http://127.0.0.1:8090');

    const records = await pb.collection('items').getFullList({
        sort: '-created',
    });

    console.log(records);
    return(records)
}



/* FormData {
  [Symbol(state)]: [
    { name: 'result', value: 'top' },
    { name: 'category', value: 'engine' },
    { name: 'Search', value: 'asdasd aasda we' }
  ]
} */
