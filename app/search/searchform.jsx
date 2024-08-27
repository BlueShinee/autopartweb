"use client"

import {useRef, useState} from "react"
import Image from "next/image"
import Link from 'next/link'
import searching from './searchEngine.js'
import Itemlisting from "@/components/itemlisting";
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

function SearchForm(props){
    const serachInput = useRef(null)
    let [result,setresult] = useState([])
    let [isLoaded, setIsLoaded] = useState(false)

    async function handleclick() {
        setIsLoaded(false)
        let response = await searching(serachInput.current.value)
        setIsLoaded(true)
        console.log(response)
        setresult(response)
    }

    return(
        <>
            <form class="w-full max-w-md">
                <div class="w-full p-4 flex items-center justify-center">
                    <fieldset className="ml-3 w-full px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out">
                        <legend className="px-2 text-blue-500">Get</legend>
                        <select className="w-full bg-transparent focus:outline-none" name="result">
                            <option value="top">Top Results</option>
                            <option value="all">All Results</option>
                        </select>
                    </fieldset>
                    <fieldset className="ml-3 w-full px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out">
                        <legend className="px-2 text-blue-500">Category</legend>
                        <select className="w-full bg-transparent focus:outline-none" name="category">
                            <option value="engine">Engine</option>
                            <option value="gearbox">Gear Box</option>
                            <option value="injector">Injector</option>
                            <option value="bodyparts">Body Parts</option>
                            <option value="differencel">Differencel</option>
                            <option value="other">Other</option>
                        </select>
                    </fieldset>
                </div>
                <div class="w-full p-4 flex items-center justify-center">
                    <input ref={serachInput} type="text" name="Search" placeholder="Search Auto Parts..." class="ml-3 w-full px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"/>
                    <button type="button" onClick={handleclick} class="ml-3 bg-blue-500 text-white rounded-full p-2 px-3 focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </form>
            <Itemlisting records={result} isLoaded={isLoaded} title="Search Results" />
        </>
    )
}

export default SearchForm