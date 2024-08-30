"use server"

import { redirect } from 'next/navigation';
import PocketBase from 'pocketbase';

export default async function updateSettings(formData) {
    const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');

    const bussinessName = formData.get("bussinessname")
    const update = await pb.collection('settings').update('bussiness__data', {
        name: bussinessName,
        location_embed: formData.get('location_embed'), //https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15845.331087857276!2d80.0342027!3d6.850654899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2537d6fb25a01%3A0xda8f9b6b25dbbd03!2sThushara%20auto%20parts!5e0!3m2!1sen!2slk!4v1724948068509!5m2!1sen!2slk
        location_map: formData.get('location_map'),
        slider_1: formData.get('slider_1'),
        slider_2: formData.get('slider_2'),
        slider_3: formData.get('slider_3'),
        buy_max_quantity: formData.get('buy_max_quantity'),
        hotline: formData.get('hotline'),
        facebook: formData.get('facebook'),
        metaicon: formData.get('metaicon')
    })

    redirect(`/adminpanel`)
}