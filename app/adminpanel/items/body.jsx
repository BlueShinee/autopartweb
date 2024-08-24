import PocketBase from 'pocketbase';
import Image from 'next/image';
import Link from 'next/link';


export default async function Body() {
    const pb = new PocketBase('http://127.0.0.1:8090');

    const records = await pb.collection('items').getFullList()
    

  return (
    <div className="w-full flex flex-col justify-center items-center">
        <Link href={"/adminpanel/items/create"} className="w-[90%] py-2 px-4 flex justify-center items-center text-lg font-semibold text-white bg-green-400 rounded-md hover:bg-green-600 transition-all hover:cursor-pointer mb-4">New Item</Link>
        <div className='flex w-full flex-col items-center'>
            {records.map((value,index)=>{
                    return <Card itemid={value.id} title={value.name} desc={value.desc} price={value.price} img={`${pb.files.getUrl(value, value.photos[0], {'thumb': '100x250'})}`}/> 
            })}
        </div>
    </div>
  )
}


async function Card(props) {
    return(
        <Link href={`/adminpanel/items/${props.itemid}`} className='flex w-[90%] my-1 border-2 border-gray-400 rounded-lg h-32'>
            <Image unoptimized src={props.img}  width={50} height={50} className='w-[40%] object-contain border-r-2 border-gray-400'/>
            <div className='flex flex-col px-4 py-2 justify-between h-32'>
                <div className='flex flex-col'>
                    <span className='line-clamp-1 font-medium'>{props.title}</span>
                    <span className='text-sm text-gray-700 line-clamp-3'>{props.desc}</span>
                </div>
                <span className='font-medium'>RS.{props.price}/=</span>
            </div>
        </Link>
    )
}