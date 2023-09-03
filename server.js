// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Parse form data

const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

app.post('/create-checkout-session', async (req, res) => {
  const dynamicPrice = parseFloat(req.body.price); // Extract the price from the form data
  const dynamicDuration = req.body.duration; // Extract the price from the form data
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['cashapp'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Daily biblical stories',
          },
          unit_amount: dynamicPrice * 100, // Convert to cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`, // Pass session ID as a query parameter
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    metadata: {
      custom_field1: 'Donation', // Add your custom fields here
      cashtag: '$cashtag', // Include the Cashtag in metadata
      duration: dynamicDuration,
    },
  });

  res.redirect(303, session.url);
});

// Add the route to retrieve session details
app.get('/retrieve-session', async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.json(session);
});

// End
// ------------------------------------------------------------
// Start

// Store the server timer state (duration) globally
let serverTimerDuration = 0;

let serverTimerInterval;

// Function to start the server timer
function startServerTimer(days, hours, minutes, seconds) {
  serverTimerDuration = days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
  isServerTimerRunning = true; // Set the timer as running

  clearInterval(serverTimerInterval); // Clear any existing timer interval

  serverTimerInterval = setInterval(() => {
    if (serverTimerDuration <= 0) {
      clearInterval(serverTimerInterval);
      isServerTimerRunning = false; // Set the timer as not running when it expires
    }
    serverTimerDuration--;
  }, 1000);
}

// Ensure that the server timer is started initially (You can adjust the initial duration as needed)
startServerTimer(2, 1, 3, 50);

// Endpoint to get the server timer state
app.get('/get-server-timer-state', (req, res) => {
  res.json({ timerDuration: serverTimerDuration, isTimerRunning: isServerTimerRunning });
});

// Endpoint to update the server timer state (called when the "Start Countdown" button is clicked)
app.get('/start-server-timer', (req, res) => {
  const days = 3; // Replace with your desired countdown duration
  const hours = 1;
  const minutes = 3;
  const seconds = 50;
  startServerTimer(days, hours, minutes, seconds);

  res.send('Server timer started');
});

// Route to pause the timer on the server
app.get('/pause-timer', (req, res) => {
  // Check if the timer is already paused
  if (!isServerTimerRunning) {
    res.send('Timer is already paused on the server.');
    return;
  }

  // Pause the timer
  clearInterval(serverTimerInterval);
  isServerTimerRunning = false;

  res.send('Timer paused on the server.');
});

// Route to reset the timer on the server (you need to implement your reset timer logic here)
app.get('/reset-timer', (req, res) => {
  // Implement your reset timer logic here
  // You may need to reset the timer duration and update isServerTimerRunning
  isServerTimerRunning = false; // Set the timer as not running
  serverTimerDuration = 0; // Reset the timer duration
  clearInterval(serverTimerInterval); // Clear the timer interval
  res.send('Timer reset on the server.');
});


app.listen(4242, () => console.log('Running on port 4242'));