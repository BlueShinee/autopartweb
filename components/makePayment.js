// components/makePayment.js
"use server"

import placeOrder from "./placeOrder";
import { redirect } from "next/navigation";

export default async function Payment({ user, itemid, quantity, address, phone}) {
  const order = await placeOrder({ user, itemid, quantity, address, phone})
  console.log(order)
  redirect('/cart')

  /* const order_id = order.id || 'ID'; // Generate a unique order ID
  const amount = order.price || 1000; // Amount in LKR

  try {
    const res = await fetch('http://localhost:3000/api/onepay'||'/api/onepay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, order_id }),
    });

    const responseText = await res.text(); // Read the response as text
    console.log('Response Text:', responseText); // Log the response text
    
    const data = await res.json();

    // Redirect to OnePay payment page
    window.location.href = data.payment_link;
  } catch (error) {
    console.error('Payment Error:', error);
  } finally {
    //setLoading(false);
  } */
  //const [loading, setLoading] = useState(false);

  //const handlePayment = async () => {
    //setLoading(true);
  //};
  return
  /* return (
    <div>
      <b onClick={handlePayment} className="w-[90%] md:w-[300px] flex justify-center items-center py-4 m-2 ml-5 hover:bg-green-700 transition-all active:scale-95   px-4 bg-green-500 w-55 rounded-md"><span className="text-white font-medium text-lg mr-2"><i className="fas fa-shopping-cart px-2"></i> 
      {loading ? 'Processing...' : 'Pay with OnePay'}
      </span></b>
    </div>
  ); */
}
