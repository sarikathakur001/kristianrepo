const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use environment variable for the Stripe key

// Route to create a customer and invoice in Stripe
router.post('/create-customer', async (req, res) => {
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

        // Create a draft invoice for the customer
        const invoice = await stripe.invoices.create({
            customer: customer.id,
            auto_advance: true
        });

        res.json({ success: true, customer, invoice });
    } catch (error) {
        console.error('Error creating customer or invoice:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
