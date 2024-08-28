"use client"

import {useState} from "react"
import Image from "next/image"
import Link from 'next/link'

function Searchbar(props){
    return(
        <div class="w-full">
            <Link href={'./search'} class="w-full p-4 flex items-center justify-center">
                <div type="text" class="ml-3 w-full px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out">Search Auto Parts...</div>
                <button class="ml-3 bg-blue-500 text-white rounded-full p-2 px-3 focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out">
                    <i class="fas fa-search"></i>
                </button>
            </Link>
        </div>
    )
  }

  
  export default Searchbar