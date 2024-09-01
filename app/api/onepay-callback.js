// pages/api/onepay-callback.js

export default function handler(req, res) {
    const { status, order_id } = req.body;
  
    if (status === 'SUCCESS') {
      // Update order status in your database
    } else {
      // Handle payment failure
    }
  
    res.status(200).end();
  }
  