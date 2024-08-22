"use client"
 
import { useRouter } from 'next/navigation'
 
export default function Header() {
    const router = useRouter()

  return (
    <div className='flex w-full justify-between p-4'>
        <span className="w-[45%] rounded-md text-lg font-semibold text-white transition-all flex justify-center items-center bg-blue-600 py-2">Items</span>
        <span className="w-[45%] rounded-md text-lg font-semibold text-white hover:bg-blue-500 transition-all hover:cursor-pointer flex justify-center items-center bg-blue-400 py-2 select-none" onClick={() => router.push('/adminpanel/orders')}>Orders</span>
    </div>
  )
}
