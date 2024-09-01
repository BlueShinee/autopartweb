// pages/thankyou.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import placeOrder from "@/components/placeOrder";

export default function ThankYouPage() {
  const router = useRouter();
  const { status, transaction_id, user, itemid, quantity, item, address, phone } = router.query;

  useEffect(() => {
    if (status === 'SUCCESS') {
      // Call the placeOrder function to save the order to the database
      placeOrder({ user, itemid, quantity, item, address, phone })
        .then(() => {
          console.log(`Order placed successfully for transaction ${transaction_id}`);
        })
        .catch((error) => {
          console.error('Error placing order:', error);
        });
    }
  }, [status, transaction_id]);

  return (
    <div>
      <h1>Thank You!</h1>
      {status === 'SUCCESS' ? (
        <p>Your payment was successful, and your order has been placed.</p>
      ) : (
        <p>There was an issue with your payment. Please try again.</p>
      )}
    </div>
  );
}
