import { getServerSession } from "next-auth";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";

import uploadImg from "./upload.js"

import {v2 as cloudinary} from "cloudinary"



export default function upload(props) {


    return (
        <div>
            <form action={uploadImg}>
                <input type="file" name="file"/>
                <input type="text" name="itemid" className="hidden" value={props.record?.id}/>
                <input type="submit" value="Upload"/>

            </form>
        </div>
      )
}
