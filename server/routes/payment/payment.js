// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
require("dotenv").config
const stripe =require('stripe')(process.env.STRIPE_SECRET_KEY) ;
const paymentRouter = require('express').Router();

paymentRouter.post('/', async (req, res) => {
    const { amount } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });
  
      res.status(200).send(paymentIntent.client_secret);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  

module.exports=paymentRouter