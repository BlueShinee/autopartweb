"use client"

import { useState } from "react"
import updateData from "./updateData.js"
import Swal from 'sweetalert2';



export default function Edit(props) {

  let [list,setlist] = useState(props.record?.big_desc.buletlist)
  const [x,refresh] = useState(0)


  return (
    <div className="flex flex-col w-full p-[4%] mt-3">
        <hr className="border-[1px] border-gray-700 mb-3"/>
        <form action={updateData} className="flex flex-col">
            <div className="w-full flex justify-between items-center">
                <span>Edit details</span>
                <button type="submit" onClick={()=>{
                  Swal.fire({
                    title: "Saved",
                    text: "Your item successfully updated",
                    icon: "success"
                  });
                }} name="submit" className="py-1 px-4 bg-green-600 text-white font-medium rounded-md hover:cursor-pointer hover:bg-green-700">Save</button>
            </div>
            <span className="text-sm text-gray-600 font-medium mt-4">Item Name</span>
            <input type="text" name="itemname" defaultValue={props.record?.name} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none"/>

            <input type="number" value={list.length} className="hidden" name="list_length"/>
            <input type="text" value={props.record.id} className="hidden" name="recordId"/>

            <span className="text-sm text-gray-600 font-medium mt-2">Avalability in stock</span>
            <select type="text" name="avalable" defaultValue={props.record?.avalable} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none">
              <option value="true">✅ Avalable</option>
              <option value="false">❌ Not Avalable</option>
            </select>

            <span className="text-sm text-gray-600 font-medium mt-2">Description</span>
            <input type="text" name="desc" defaultValue={props.record?.desc} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none"/>

            <span className="text-sm text-gray-600 font-medium mt-2">Price</span>
            <input type="number" name="price" defaultValue={props.record?.price} className="border-2 border-gray-400 rounded-md w-24 p-1 focus:border-blue-500 outline-none"/>

            <span className="text-sm text-gray-600 font-medium mt-2">Discount Price</span>
            <input type="number" name="dis_price" defaultValue={props.record?.discount_price} className="border-2 border-gray-400 rounded-md w-24 p-1 focus:border-blue-500 outline-none"/>

            <span className="text-sm text-gray-600 font-medium mt-2">Model name</span>
            <input type="text" name="model" defaultValue={props.record?.model} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none"/>

            <span className="text-sm text-gray-600 font-medium mt-2 ">Category</span>
            <select type="text" name="Type" defaultValue={props.record?.type} className="border-2 mb-4 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none">
              <option value="engine">Engine</option>
              <option value="gearbox">Gear Box</option>
              <option value="injector">Injector</option>
              <option value="bodyparts">Body Parts</option>
              <option value="differencel">Differencel</option>
              <option value="other">Other</option>
            </select>

            <span className="text-sm text-gray-600 font-medium mt-2 ">Big Description</span>
            <span className="text-sm text-gray-600 font-medium mt-4 ">First Paragraph</span>
            <textarea name="st-prg" defaultValue={props.record?.big_desc["st-paragraph"]} className="resize-none h-48 border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none mb-4"></textarea>

            <span className="text-sm text-gray-600 font-medium mt-2 ">Bulet List</span>
            {list.map((v,i)=>{
              return <input type="text" name={`list_${i}`} defaultValue={v} className="border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none mb-2"/>
            })}
            <button type="button" className="py-1 px-4 bg-green-600 text-white font-medium rounded-md hover:cursor-pointer hover:bg-green-700" onClick={()=>{
              let temp = list
              temp.push("")
              setlist(temp)
              refresh(x+1)
            }}>+ Add</button>


            <span className="text-sm text-gray-600 font-medium mt-4 ">End Paragraph</span>
            <textarea name="end-prg" defaultValue={props.record?.big_desc["end-paragraph"]} className="resize-none h-48 border-2 border-gray-400 rounded-md p-1 focus:border-blue-500 outline-none"></textarea>

        </form>
    </div>
  )
}


/* {
  big_desc: {
    buletlist: [ 'Short asf boi', 'nigga', 'dad of 0 children' ],
    'end-paragraph': 'This is the best deal you could posibbly have on a slave , so get him and his famillytoday!',
    'st-paragraph': 'This is panuwa aka kumuthu prabasha. He is a loving husband of sanjuni and curruntly have 3 kids.when u buy him u get his kids and wife as a bounes '
  },
} */







