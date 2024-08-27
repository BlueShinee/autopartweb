

export default async function page() {
  return (
    <div>
        <Link href={"/adminpanel/items"} className="flex justify-center items-center py-1 m-2 hover:bg-blue-500 transition-all active:scale-95   px-4 bg-blue-400 w-24 rounded-md"><span className="text-white font-medium mr-1 text-lg">Back</span><Image src={"/back-arrow.svg"}  width={20} height={20}/></Link>

        <form action="" className="flex flex-col p-4">
            <span className="text-sm text-gray-600 font-medium mt-4">Item Name</span>
            <input type="text" name="itemname" defaultValue={""} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none"/>

        </form>
    </div>
  )
}
