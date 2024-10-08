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
                return (<li className='pl-3 text-[#555]'>{text1}</li>)
            })}
        </section>
    )
}
export default function Body(props) {
    const records = props.items;
  
    return (
      <div className="w-full h-full flex flex-col justify-center items-center overflow-x-hidden">
        <div className='flex flex-wrap w-full flex-col justify-left items-left mt-3 px-2'>
          <h1 className='text-xl p-2 border-l-4 border-blue-500 bg-blue-100'>Welcome to the online shopping platform of {props.settings.name}. You can order any auto part here.</h1>
          <br/>
          <b className='mt-6'>User Instructions</b>
          <DescribeSection
            title={"Items"}
            text={['Each item contains following details.', 'Name, Images, Category, Brand Name, Description, Price, Discount Price, and Bullets.']}
          />
          <DescribeSection
            title={"Popular Items"}
            text={['The top 20 most popular or frequently searched items in stock are displayed as popular items.']}
          />
          <DescribeSection
            title={"Profile"}
            text={['You can update your phone number and address by clicking the Edit option.']}
          />
          <DescribeSection
            title={"Search Algorithms"}
            text={['The search bar finds items by matching your keywords with the item\'s name and brand.', 'The category filter allows you to refine search results to the selected category.']}
          />
          <DescribeSection
            title={"Purchasing Items"}
            text={['You need to log in to place an order.', 'When you proceed to buy something, you will be asked to specify the quantity, and your total price will be displayed.', 'You will receive an order confirmation on WhatsApp. You can view your order by clicking the "View Order" button in the WhatsApp message.', 'You can change your home address for the current order.']}
          />
          <DescribeSection
            title={"Cart"}
            text={['You can view all your pending orders in the Cart.']}
          />
          {/* <DescribeSection
              title={"Orders"}
              text={[
                  'When you place an order, it will initially be in a Pending state.',
                  'Once the admin confirms it, your order status will change to On The Way.',
                  'If the admin rejects your order, it will be marked as Rejected.',
                  'After you receive your order, you should confirm it as Delivered.',
                  'All actions trigger a WhatsApp alert.'
              ]}
          /> */}
          <b className='mt-6'>Admin Control Panel</b>
          <DescribeSection
            title={"Admin Panel"}
            text={['Click on "Admin Panel" in the navigation bar to be redirected to the admin panel.']}
          />
          <DescribeSection
            title={"Settings"}
            text={['You can modify website components, including:', 'Name - Header title', 'Google Map - Insert location url & embeded iframe\'s url', 'Slider Image - URLs for homepage slider images', 'Max Quantity of Order - Limit the quantity that a customer can order.', 'Hotline - Hotline number. A WhatsApp redirect button is created automatically.']}
          />
          <DescribeSection
            title={"Add Item"}
            text={['Click on the "Add Item" button.', 'Enter the Name and Price, then click on "Create."', 'You will be automatically redirected to the editing page.', 'Fill in the other details and click "Save."']}
          />
          <DescribeSection
            title={"Add Images to Item"}
            text={['Click on the "[+ Select Image]" button and select a 1x1 size image.', 'Then, click on "Add Image."', 'To delete an image, click on the image and confirm the delete action.', 'Save your changes.']}
          />
          <DescribeSection
            title={"Orders"}
            text={['Customer orders are displayed here.', 'After you deliver an order, click the "Confirm Order" button.', 'The customer will then receive an "Order Confirmed" notification on WhatsApp.']}
          />
          {/* <DescribeSection
              title={"Admin Orders Management"}
              text={[
                  'As an admin, you can view all orders placed by customers.',
                  'You have the authority to confirm an order, changing its status from Pending to On The Way.',
                  'If an order cannot be fulfilled, you can reject it, which will mark the order as Rejected.',
                  'Once the customer confirms delivery, the order status will be updated to Delivered.',
                  'All actions trigger a WhatsApp alert.'
              ]}
          /> */}
          <b className='mt-6'>Application</b>
          <DescribeSection
            title={"Frame Work"}
            text={['Next.js', 'Generated by create next app', 'Hard coded application']}
          />
          <DescribeSection
            title={"Database"}
            text={['Pocketbase', 'Database handled on Pocketbase BaaS']}
          />
          <DescribeSection
            title={"Domain"}
            text={['.lk top level domain']}
          />
          <DescribeSection
            title={"Hosting"}
            text={['Virtual Privet Servers (VPS)']}
          />
          <b className='mt-6'>Developer</b>
          <DescribeSection
            title={"K.Prabhasha"}
            text={['Fullstack developers | Evelocore', 'WhatsApp - 077 611 5376', 'Github - prabhasha2006', 'E-mail - kumuthuprabhasha@gmail.com']}
          />
          <DescribeSection
            title={"Pasindu"}
            text={['Fullstack developers | Zyriz', 'Github - blueshinee', 'E-mail - sadaminatou@gmail.com']}
          />
        </div>
        <div className='flex flex-wrap w-full flex-row justify-left items-left mt-3 pl-2'>
        </div>
      </div>
    );
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