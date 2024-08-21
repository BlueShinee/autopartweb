import PocketBase from "pocketbase"
import Link from 'next/link';
import Image from "next/image";
import Items2 from "@/components/items2"

export default async function item(props) {
    const pb = new PocketBase('http://127.0.0.1:8090');
    const record = await pb.collection('items').getOne(props.params.wtf,{expand: 'relField1,relField2.subRelField',})
    const update = await pb.collection('items').update(props.params.wtf, {});
    const photos = record.photos
    const photoURL = []
    photos.map((v,i)=>{
        let temp = pb.files.getUrl(record,v,{'thumb': '100x250'})
        photoURL.push(temp)
    })

    console.log(photoURL,photos);
    

    console.log(record.name);
    return (
        <div className="flex flex-col">
            <Link href={"/"} className="flex justify-center items-center py-1 m-2 hover:bg-blue-500 transition-all active:scale-95   px-4 bg-blue-400 w-24 rounded-md"><span className="text-white font-medium text-lg mr-2">Back</span><Image src={"/back-arrow.svg"}  width={20} height={20}/></Link>
            <div className="w-full flex flex-col justify-center items-center">
                <Items2 photoURL={photoURL} record={record} photos={photos}/>
            </div>
        </div>
    )
}
