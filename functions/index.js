const functions = require('firebase-functions');
const express  = require("express");
const cors = require("cors");
// const { request, response } = require('express');
const stripe = require("stripe")('sk_test_51HPvfAHrDUWQFG90VaaQLuszm6QoXPXdZcx8zyhWVeqKMA5MVNM5XV7Q6VgPXJBKYE3uGi4sgG6UlWssF92a0fGl00IZwdoiv4');

// API
//App config
const app = express();

//Middlwares
app.use(cors({origin: true}));
app.use(express.json());

//API routes
app.get('/', (request, response) => response.status(200).send('hello world'));

app.post('/payments/create', async(request, response) => {
    const total = request.query.total;

    console.log('Paymemnt recieved >>>> ' + total);
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd',
    });

    //ok    
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,

    })    
})   
//Listen command
exports.api = functions.https.onRequest(app)

//example endpoint
// http://localhost:5001/clone-b48b7/us-central1/api