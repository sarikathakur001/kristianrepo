const express = require('express');
const app = express();
app.use(express.json()); // To parse JSON request bodies

// Example GET route (for testing purposes only)
app.get('/create-customer', (req, res) => {
    res.send('This endpoint is for creating customers.');
});

// Example POST route (recommended)
app.post('/create-customer', (req, res) => {
    const { name, email, address } = req.body;

    // Your code to create a customer goes here (e.g., call to Stripe API)
    
    res.send({ success: true, message: 'Customer created successfully.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
