const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')('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'); // Replace with your Stripe Secret Key

const app = express();

// Enable CORS for Webflow Domain
const corsOptions = {
    origin: 'https://informativ-reklame-124.webflow.io', // Replace with your Webflow domain
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allows credentials to be sent
};

app.use(cors(corsOptions)); // Apply CORS to all routes

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Route to create a customer in Stripe
app.post('/create-customer', async (req, res) => {
    try {
        const { name, email, shipping } = req.body;

        // Create a customer in Stripe
        const customer = await stripe.customers.create({
            name: name,
            email: email,
            shipping: {
                name: name,
                address: {
                    line1: shipping.address.line1,
                    city: shipping.address.city,
                    postal_code: shipping.address.postal_code,
                    country: shipping.address.country
                }
            }
        });

        // Return customer ID or the full customer object
        res.json({ success: true, customer });
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
