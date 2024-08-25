


export default async function Edit() {
  return (
    <div className="flex flex-col w-full p-[4%] mt-3">
        <hr className="border-[1px] border-gray-700 mb-3"/>
        <form action="">
            <div className="w-full flex justify-between items-center">
                <span>Edit details</span>
                <button type="submit" name="submit" className="py-1 px-4">Save</button>
            </div>
        </form>
    </div>
  )
}
