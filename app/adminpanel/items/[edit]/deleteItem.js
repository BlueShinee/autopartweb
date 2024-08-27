"use server"

import { redirect } from 'next/navigation';
import PocketBase from 'pocketbase';



export default async function deleteItem(formData) {
    const pb = new PocketBase('http://127.0.0.1:8090');
    const itemId = formData.get("itemid")
    await pb.collection('items').delete(itemId);

    redirect("/adminpanel/items")
}