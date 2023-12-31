function fetchDuration() {

// Fetch the session ID from the query parameters
const urlParams = new URLSearchParams(window.location.search);
const sessionId = urlParams.get('session_id');

// Use the session ID to fetch the session details from Stripe
fetch(`/retrieve-session?sessionId=${sessionId}`)
    .then(response => response.json())
    .then(data => {
        console.log('Stripe Response:', data);
        // You can access the Stripe response data here and perform further actions
        const startButton = document.getElementById('start-button');
        var dataRes = data.metadata.duration;
        const durationVars = [dataRes];
        const durationArray = durationVars[0];

        // Split the string into an array of numbers
        const durationNumArr = durationArray.split(', ').map(Number);

        // Start the client timer
        const initialDuration = durationNumArr[0] * 24 * 60 * 60 + durationNumArr[1] * 60 * 60 + durationNumArr[2] * 60 + durationNumArr[3]; // Replace with your desired countdown duration
        startClientTimer(initialDuration);

        // Hide the start button after starting the timer
        startButton.style.display = 'none';

    }).catch(error => console.error('Error:', error));}