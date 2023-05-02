const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")
(  'sk_test_51N2PzMSJxorNq97F0ghVpBW9kWL3Euv61mFqISXuUdAo8R9mEQBIDGB2TAMkyMX3AfGHwlFLxyuf9kdT8xBIoBCM00hv6OepWO')

//API

//App Config 
const app = express();

//Middleware
app.use(cors({origin:true}))
app.use(express.json());
//API Routes
app.get('/',(request,response)=>response.status(200).send('Hello World'))

app.post('/payments/create', async(request , response)=>{
    const total = request.query.total;
    console.log('Payment request received for this amount >>>', total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency:'inr'
    });
    response.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })
})
//Listen Command
exports.api = functions.https.onRequest(app)

//Example endpoint
//http://127.0.0.1:5001/challenge-6a092/us-central1/api


//firebase emulators:start