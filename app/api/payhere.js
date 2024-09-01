import axios from 'axios';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { order_id, items, amount, currency, first_name, last_name, email, phone, address, city, country } = req.body;

    const payhereData = {
      merchant_id: process.env.PAYHERE_MERCHANT_ID,
      return_url: 'https://yourdomain.com/payment/success',
      cancel_url: 'https://yourdomain.com/payment/cancel',
      notify_url: 'https://yourdomain.com/api/payhere',
      order_id,
      items,
      currency,
      amount,
      first_name,
      last_name,
      email,
      phone,
      address,
      city,
      country,
    };

    // Generate a signature using your secret key
    const signature = crypto.createHmac('sha256', process.env.PAYHERE_MERCHANT_SECRET)
                           .update(JSON.stringify(payhereData))
                           .digest('hex');

    payhereData['signature'] = signature;

    try {
      const response = await axios.post('https://sandbox.payhere.lk/pay/checkout', payhereData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      res.status(200).json({ success: true, data: response.data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
