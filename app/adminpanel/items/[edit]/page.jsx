
import { getServerSession } from "next-auth";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";


export default function page({params}) {
    const pb = new PocketBase('http://127.0.0.1:8090');


    async function upload(formdata) {
        "use server"

        

    }
    


  return (
    <div>
        <form action={upload}>
            <input type="file" name="file"/>
            <input type="submit" value="Upload"/>
        </form>
    </div>
  )
}
