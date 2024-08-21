import PocketBase from 'pocketbase';
import Image from 'next/image';
import Link from 'next/link';


export const dynamic = 'force-dynamic';

async function Itemlisting() {
    
    const pb = new PocketBase('http://127.0.0.1:8090');

    const records = await pb.collection('items').getFullList()
    console.log(records);
    
    /* const url = pb.files.getUrl(records, records.photos[0], {'thumb': '100x250'});
    
    console.log(url); */
    
    
  return (
    <div className='flex flex-col items-center w-full mt-4'>
        <h2 className='text-center font-semibold text-blue-500 text-lg'>Populer Products</h2>
        <div className='grid grid-cols-2 w-full justify-center items-center'>
            {records.map((value,index)=>{
                if (index < 20) {
                    return <Card itemid={value.id} title={value.name} desc={value.desc} price={value.price} img={`${pb.files.getUrl(value, value.photos[0], {'thumb': '100x250'})}`}/> 
                }
            })}
        </div>
    </div>
  )
}

function Card(props){

    


    
    return(
        <div className='w-full flex justify-center items-center select-text'>
            <Link href={`/Items/${props.itemid}`} className=' hover:scale-105 transition-all w-44 h-72 rounded-md shadow-xl border-[2px] border-gray-300 my-4 flex flex-col items-center'>
                <div className='w-full aspect-1 border-b-gray-300 border-b-[1px]'>
                    <img src={props.img} alt="" className='aspect-1 w-full rounded-t-md'/>
                </div>
                <div className='flex flex-col w-full h-full justify-between'>
                    <div>
                        <span className='ml-2 line-clamp-1 text-lg font-medium'>{props.title}</span>
                        <span className='text-gray-500 ml-2 text-sm line-clamp-3 leading-4'>{props.desc}</span>
                    </div>
                    <span className='ml-2 text-blue-600 text-lg font-medium'>RS.{props.price}/=</span>
                </div>
            </Link>
        </div>
    )
}


export default Itemlisting