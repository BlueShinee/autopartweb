"use client"

import PocketBase from 'pocketbase';
import Image from 'next/image';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

function DescribeSection({title, text}){
    return (
        <section className='pl-2 border-l-4 border-blue-500 my-2'>
            <h2 className='text-blue-500'># {title}</h2>
            {text.map((text1)=>{
                return (<li className='pl-3 text-[#888]'>{text1}</li>)
            })}
        </section>
    )
}
export default function Body(props) {

    const records = props.items

  return (
    <div className="w-full h-full flex flex-col justify-center items-center overflow-x-hidden">
        <div className='flex flex-wrap w-full flex-row justify-left items-left mt-3 pl-2'>
            <b>This is the online shopping platform of {props.settings.name}. You can order any auto part at this.</b>
            <br/><br/>
            <b className='mt-6'>Instructions for users</b>
            <DescribeSection
                title={"Items"}
                text={['Item has 5 details in this scope.', 'Name, Images, Category, Brand Name, Description, Price, Discount Price, Bullets']}
            />
            <DescribeSection
                title={"Popular items"}
                text={['The most popular or most searching 20 items in stock will be displaying as popular items.']}
            />
            <DescribeSection
                title={"Profile"}
                text={['You can change Number & Address by clicking Edit option']}
            />
            <DescribeSection
                title={"Search algorythms"}
                text={['Search bar is finding your keywords with item\'s name & brand', 'Category is a filter when you are searching something, you will got only results of selected category.']}
            />
            <DescribeSection
                title={"Buy item"}
                text={['You need login to place order.', 'When you are going to buy something it asked you quantity and display your total price.', 'You got a feedback about order on WhatsApp. You can view your order using the \"View Order\" button in WhatsApp message.', 'You can change home address for current order.']}
            />
            <DescribeSection
                title={"Cart"}
                text={['You can see all your pending orders on Cart.']}
            />
            <b className='mt-6'>Admin Controll Panel</b>
            <DescribeSection
                title={"Admin Panel"}
                text={['Click on Admin_Panel on navigation bar, then you will redirect to the admin panel.']}
            />
            <DescribeSection
                title={"Add Item"}
                text={['Click on Add Item button', 'Enter Name & Price, then click on create.', 'After that you will redirect the editing page automatically.', 'Fill other details and click on save']}
            />
            <DescribeSection
                title={"Add images to item"}
                text={['Click on [+ Select Image] button and select an image 1x1 size.', 'Then click on Add image button', 'If you want to delete an image, click on the image and confirm delete action.', 'Save it']}
            />
            <DescribeSection
                title={"Orders"}
                text={['You got the customer orders in there. After you deliver it, you should click on [Confirm Order] button. Then customer got a notification as Order Confirmed on WhatsApp.']}
            />
        </div>
        <div className='flex flex-wrap w-full flex-row justify-left items-left mt-3 pl-2'>
        </div>
    </div>
  )
}


function Card(props) {
    console.log(props.img.array?.[0]);
    
    return(
        <Link href={`/adminpanel/items/${props.itemid}`} className='flex w-[90%] my-1 border-2 border-gray-400 rounded-lg h-32'>
            <CldImage src={props.img.array?.[0]}  width={150} height={150} className='w-[40%] object-contain border-r-2 border-gray-400'/>
            <div className='flex flex-col px-4 py-2 justify-between h-32'>
                <div className='flex flex-col'>
                    <span className='line-clamp-1 font-medium'>{props.title}</span>
                    <span className='text-sm text-gray-700 line-clamp-3'>{props.desc}</span>
                </div>
                <span className='font-medium'>RS.{props.price}/=</span>
            </div>
        </Link>
    )
}