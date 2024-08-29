"use client"

import {useState} from "react"
import Image from "next/image"
import Link from 'next/link'
import {searching} from './searchEngine'

function SearchForm(props){
    return(
        <form class="w-full max-w-xl" action={searching}>
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
                <input type="search" name="keywords" placeholder="Search Auto Parts..." class="ml-3 w-full px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"/>
                <button class="ml-3 bg-blue-500 text-white rounded-full p-2 px-3 focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </form>
    )
}

export default SearchForm