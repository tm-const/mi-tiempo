// Function to update the visibility of buttons based on server timer state
function updateButtonVisibility(serverTimerState) {
    const startButton = document.getElementById('start-button');
    // const pauseButton = document.getElementById('pause-button');
    const resetButton = document.getElementById('reset-button');

    if (serverTimerState && serverTimerState.isTimerRunning) {
        startButton.style.display = 'none'; // Hide the "Start Timer" button
        // pauseButton.style.display = 'block';
        resetButton.style.display = 'block'; // Show the "Reset Timer" button
    } else {
        startButton.style.display = 'block'; // Show the "Start Timer" button
        // pauseButton.style.display = 'none';
        resetButton.style.display = 'block'; // Hide the "Reset Timer" button
    }
}

// Event listener for the Pause button
document.getElementById('pause-button').addEventListener('click', () => {
    // Send a request to the server to pause the timer
    fetch('/pause-timer')
        .then(response => response.text())
        .then(data => {
            console.log(data);
            // Update the server timer display on success
            // serverTimerDisplay.textContent = 'Server Timer paused on the server.';
        })
        .catch(error => {
            console.error('Error pausing timer:', error);
        });
});

// Function to update the countdown display
function updateCountdownDisplay(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;

    const countdownDisplay = document.getElementById('countdown');
    countdownDisplay.textContent = `Current time countdown: ${formatDate()} at (${days}d ${hours}h ${minutes}m ${remainingSeconds}s)`;
}

// Function to format the current date and time
function formatDate() {
    const now = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    const month = monthNames[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const standardHours = hours % 12 || 12; // Convert to 12-hour format

    return `${month} ${day}, ${year} at ${standardHours}:${minutes}:${seconds} ${ampm}`;
}

// Check if the server timer has already started
fetch('/get-server-timer-state')
    .then(response => response.json())
    .then(serverTimerState => {
        // Update the visibility of buttons based on server timer state
        updateButtonVisibility(serverTimerState);
    });

// Event listener for the Start button
document.getElementById('start-button').addEventListener('click', () => {
    // Send a request to the server to start or resume the timer
    fetch('/start-server-timer')
        .then(response => response.text())
        .then(data => {
            console.log(data);
            // You can also update the server timer display on success
            // serverTimerDisplay.textContent = 'Server Timer started on the server.';
        });
});

// Event listener for the Reset button
document.getElementById('reset-button').addEventListener('click', () => {
    // Send a request to the server to reset the timer
    fetch('/reset-timer')
        .then(response => response.text())
        .then(data => {
            console.log(data);
            // You can also update the server timer display on success
            // serverTimerDisplay.textContent = 'Server Timer reset on the server.';
        });
});

// Function to format seconds as HH:MM:SS
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Function to update the timer display
function updateTimerDisplay(seconds) {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = formatTime(seconds);
}

// Function to start the client timer
function startClientTimer(duration) {
    let totalSeconds = duration;

    function updateAndDisplayTime() {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval); // Stop the timer
            updateTimerDisplay(0); // Display 00:00:00 when the timer expires
        } else {
            updateTimerDisplay(totalSeconds);
            updateCountdownDisplay(totalSeconds); // Update the countdown display
            totalSeconds--;
        }
    }

    updateAndDisplayTime(); // Initial display

    const timerInterval = setInterval(updateAndDisplayTime, 1000); // Update every second
}

// Check if the server timer has already started
fetch('/get-server-timer-state')
    .then(response => response.json())
    .then(serverTimerState => {
        const startButton = document.getElementById('start-button');
        if (serverTimerState && serverTimerState.timerDuration) {
            // If the server timer state is available, start the client timer with the server's duration
            startClientTimer(serverTimerState.timerDuration);
            startButton.style.display = 'none';
        } else {
            // If the server timer has not started, display the start button
            startButton.style.display = 'block';

            // Event listener for the Start Countdown button
            startButton.addEventListener('click', () => {
                // Start the client timer
                fetchDuration();

                // Hide the start button after starting the timer
                startButton.style.display = 'none';
            });
        }
    });