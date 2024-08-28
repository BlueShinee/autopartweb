"use server"

import { redirect } from 'next/navigation';
import PocketBase from 'pocketbase';

export default async function updateSettings(formData) {
    const pb = new PocketBase('http://127.0.0.1:8090');

    const bussinessName = formData.get("bussinessname")
    const update = await pb.collection('settings').update('bussiness__data', {
        name: bussinessName,
        slider_1: formData.get('slider_1'),
        slider_2: formData.get('slider_2'),
        slider_3: formData.get('slider_3'),
    })

    redirect(`/adminpanel`)
}