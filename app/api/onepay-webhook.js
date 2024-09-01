// pages/api/onepay-webhook.js

import payToOrder from "@/components/payToOrder";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { status, transaction_id, order_id } = req.body;

    if (status === 'SUCCESS') {
      try {
        // Call the payToOrder function to place the order
        const order = await payToOrder({ orderid: order_id });
        if(order.payment == true){
            console.log(`Order placed successfully for transaction ${transaction_id}`);
        }else{
            console.log(`Order placed but not paid to order correctly ${transaction_id}`);
        }
      } catch (error) {
        console.error('Error paying to order:', error);
      }
    }

    // Respond to OnePay to acknowledge receipt of the webhook
    res.status(200).send('OK');
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
