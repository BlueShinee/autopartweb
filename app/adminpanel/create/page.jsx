import Link from "next/link"
import Image from "next/image"

export default async function page() {
  return (
    <div>
        <Link href={"/adminpanel/items"} className="flex justify-center items-center py-1 m-2 hover:bg-blue-500 transition-all active:scale-95   px-4 bg-blue-400 w-24 rounded-md"><span className="text-white font-medium mr-1 text-lg">Back</span><Image src={"/back-arrow.svg"}  width={20} height={20}/></Link>

        <form action="">

        </form>
    </div>
  )
}
