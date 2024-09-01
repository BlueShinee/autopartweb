// pages/api/onepay.js

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, order_id } = req.body;

    const merchant_id = process.env.ONEPAY_MERCHANT_ID;
    const merchant_secret = process.env.ONEPAY_MERCHANT_SECRET;
    const currency = 'LKR';

    const payload = {
      merchant_id,
      amount,
      order_id,
      currency,
      // Add any additional required fields
    }

    try {
      const response = await axios.post('https://api.onepay.lk/payment', payload, {
        headers: {
          'Authorization': `Bearer ${merchant_secret}`
        }
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Payment processing failed.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
