"use client"
export default function items2(props) {
  return (
    <>
        <img src={props.pb.files.getUrl(props.record, props.photos[0], {'thumb': '100x250'})} className="w-[90%] rounded-lg shadow-xl"/>
        <div className="w-[90%] flex justify-around items-center mt-2">
            {props.photos.map((value,index)=>{
                return <img src={props.pb.files.getUrl(props.record,value,{'thumb': '100x250'})} className="w-[23%] h-20 object-contain bg-gray-300 border-gray-400 border-2 shadow-xl p-2 rounded-md "/>
            })}
        </div>
    </>
  )
}
