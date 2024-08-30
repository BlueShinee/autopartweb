"use server"

import { redirect } from 'next/navigation';
import PocketBase from 'pocketbase';



export default async function updateData(formData) {
    const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');


    let list_l = formData.get("list_length")
    let list = []

    for (let index = 0; index < list_l; index++) {
            let temp = formData.get(`list_${index}`)
            if (temp !== "") {
                list.push(temp)
            }
    }



    

    

    const big_desc ={
        buletlist: list,
        'end-paragraph': formData.get("end-prg"),
        'st-paragraph': formData.get("st-prg")
    }

    const record = {
        name: formData.get("itemname"),
        desc: formData.get("desc"),
        discount_price: formData.get("dis_price"),
        model: formData.get("model"),
        price: formData.get("price"),
        type: formData.get("Type"),
        big_desc: big_desc
    }



    const update = await pb.collection('items').update(formData.get("recordId"), record);

    redirect(`/adminpanel/items/${formData.get("recordId")}`)
}


  /* {
  big_desc: {
    buletlist: [ 'Short asf boi', 'nigga', 'dad of 0 children' ],
    'end-paragraph': 'This is the best deal you could posibbly have on a slave , so get him and his famillytoday!',
    'st-paragraph': 'This is panuwa aka kumuthu prabasha. He is a loving husband of sanjuni and curruntly have 3 kids.when u buy him u get his kids and wife as a bounes '
  },
} */