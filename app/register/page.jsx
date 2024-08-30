import { createuser } from "./actions"

export const revalidate = 0
export const dynamic = "force-dynamic"

export default async function page() {


  return (
    <div className="w-full h-screen flex justify-center bg-blue-400 items-center">
        <div className="w-[85%] rounded-md bg-white flex flex-col items-center">
            <span className="font-semibold text-xl m-4 text-blue-600">Register</span>
            <form action={createuser} className="w-full flex flex-col items-center">
                <label htmlFor="number" className="w-[80%] mb-1 font-medium">Whatsapp Number:</label>
                <input type="number" name="number" placeholder="079 321 8912" className="w-[80%] mb-2 border-2 border-gray-400 rounded-md py-1 px-2 focus:outline-blue-400" required maxLength="10"/>

                <label htmlFor="address" className="w-[80%] mb-1 font-medium">Shipping Address:</label>
                <input type="text" name="address" placeholder='N0.04,Wijethilaka mawatha, Matara 12' className="w-[80%] border-2 border-gray-400 rounded-md py-1 px-2 focus:outline-blue-400" required/>

                <button className="py-2 px-4 m-4 bg-blue-400 text-lg font-semibold text-white rounded-md hover:cursor-pointer hover:bg-blue-500 transition-all active:scale-95 active:bg-blue-600">
                    Register
                </button>
            </form>
        </div>  
    </div>
  )
}
