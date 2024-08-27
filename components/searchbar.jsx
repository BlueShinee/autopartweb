"use client"

import {useState} from "react"
import Image from "next/image"
import Link from 'next/link'

function Searchbar(props){
    return(
        <div class="w-full max-w-md">
          <div class="w-full p-4 flex items-center justify-center">
            <input type="text" placeholder="Search Auto Parts..." class="w-full px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"/>
            <button class="ml-3 bg-blue-500 text-white rounded-full p-2 px-3 focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out">
                <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
    )
  }

  
  export default Searchbar