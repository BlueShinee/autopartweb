"use client"

import Link from 'next/link';

function Contactmenu(props) {
  const settings = props.settings || {hotline:"null"}
  const WAhref = 
  "https://wa.me/"+(
    String(settings.hotline).replace(/ /gi,'').startsWith('7') ? 
    '94'+(String(settings.hotline).replace(/ /gi,'')) : 
    '94'+(String(settings.hotline).replace(/ /gi,'').replace("0",'').replace("94",''))
    )
  console.log(WAhref)
    return(
      <div className={`fixed ${props.Contactmenustate?"flex":"hidden"} flex justify-center top-0 items-center w-full z-20 h-screen content-center backdrop-blur-sm transition-all delay-500`}>
        <div className=' transition-all delay-200 absolute z-10 w-full top-0 h-screen' onClick={()=>{props.menufunc(false)}}></div>
        <div className='relative z-20 w-[95%] bg-blue-400 rounded-md shadow-md flex flex-col items-center'>
          <span className='w-full flex justify-center items-center relative z-50 my-4 font-medium text-lg text-white'>Hotline</span>
          <div className='w-full flex justify-center items- mb-6'> 
  
            <Link href={WAhref}>
            <div className='flex justify-center items-center mr-1 hover:cursor-pointer active:cursor-grabbing transition-all hover:bg-green-500 active:scale-95 select-none py-3 px-2 text-white text-md font-medium bg-green-400 rounded-md shadow-md'>
              <svg fill="#ffffff" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 308 308" stroke="#ffffff">
                <g id="SVGRepo_bgCarrier"/>
                <g id="SVGRepo_tracerCarrier"/>
                <g id="SVGRepo_iconCarrier"> <g id="XMLID_468_"> <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"/> <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"/> </g> </g>
              </svg>
                <span className='ml-1'>
                  {settings.hotline}
                </span>
            </div>
            </Link>
            <div className='flex justify-center items-center hover:cursor-pointer active:cursor-grabbing transition-all hover:bg-blue-600 active:scale-95 select-none py-3 px-2 ml-1 text-white text-md font-medium bg-blue-500 rounded-md shadow-md'>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="phone-incoming-solid">
                <g id="Vector">
                <path d="M19.4073 2.35703C19.7327 2.03159 19.7327 1.50395 19.4073 1.17852L18.818 0.589262C18.4926 0.263825 17.9649 0.263825 17.6395 0.589262L14.104 4.12481L12.6308 2.65162C12.3924 2.41329 12.034 2.34199 11.7226 2.47098C11.4112 2.59996 11.2082 2.90382 11.2082 3.24088V7.95492C11.2082 8.41516 11.5813 8.78826 12.0415 8.78826H16.7555C17.0926 8.78826 17.3965 8.58522 17.5254 8.27382C17.6544 7.96243 17.5831 7.604 17.3448 7.36567L15.8717 5.89258L19.4073 2.35703Z" fill="white"/>
                <path d="M1.67157 3.78472C1.58749 2.59364 2.59609 1.66667 3.78768 1.66667H6.33838C6.95005 1.66667 7.50173 2.03522 7.73698 2.60101L8.80361 5.16622C9.06344 5.79111 8.87904 6.51288 8.35151 6.93577L7.68662 7.46879C7.3899 7.70666 7.28902 8.11683 7.46495 8.45398C8.36912 10.1868 9.70533 11.6574 11.3303 12.7222C11.6734 12.947 12.1264 12.8576 12.3823 12.5371L13.0751 11.6692C13.4972 11.1406 14.2174 10.9558 14.841 11.2162L17.4009 12.285C17.9655 12.5208 18.3333 13.0736 18.3333 13.6865V14.5722H18.2991V16.2082C18.2991 17.4023 17.3741 18.4129 16.1855 18.3284C8.58512 17.7877 2.21039 11.4181 1.67157 3.78472Z" fill="white"/>
                </g>
                </g>
              </svg>
              <span className='ml-1'>
                {settings.hotline}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  

export default Contactmenu