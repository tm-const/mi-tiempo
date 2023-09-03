// Set the date values to the .date paragraph
const dateParagraph = document.querySelector('.date');

// Get the current date and time
const currentDate = new Date();
const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};
const formattedDateTime = currentDate.toLocaleString('en-US', options);

dateParagraph.textContent = `Date: ${formattedDateTime}`;

// Get all buttons with data-duration attribute
const buttons = document.querySelectorAll('button[data-duration]');

// Attach click event listeners to the buttons
buttons.forEach(button => {
  button.addEventListener('click', function () {
    const duration = this.getAttribute('data-duration');
    const cost = this.getAttribute('data-cost'); // Access data-cost attribute
    selectTimer(duration, cost); // Pass both duration and cost to the function
  });
});

function selectTimer(duration, cost) {
  // Parse the duration string to extract days, hours, minutes, and seconds
  const values = duration.split(', ').map(Number); // Parse to numbers
  const [days, hours, minutes, seconds] = values;
  let timeText = '';

  // Check if the first value is not 0 or -0 before including it in timeText
  if (days !== 0) {
    timeText += `${days}d `;
  }
  if (hours !== 0) {
    timeText += `${hours}h `;
  }
  if (minutes !== 0) {
    timeText += `${minutes}m `;
  }
  if (seconds !== 0) {
    timeText += `${seconds}s `;
  }

  // Set the checkout cost value
  const costParagraph = document.querySelector('.cost');
  costParagraph.textContent = `Cost: $${cost}`; // Display cost

  // Set the duration value, excluding the first value if it's 0 or -0
  const durationParagraph = document.querySelector('.duration');
  durationParagraph.textContent = `Duration: ${timeText}`;
  console.log(`Cost: $${cost}`); // Log cost to the console

  // Set the checkout price value
  const checkoutPrice = document.getElementById('price-input');
  checkoutPrice.value = cost;

  // Set the checkout duration value
  const checkoutDuration = document.getElementById('duration-input');
  checkoutDuration.value = duration;
}

// Get all buttons with data-duration attribute
const durationButtons = document.querySelectorAll('button[data-duration]');
const checkoutForm = document.getElementById('checkout-form');

// Attach click event listeners to the buttons
durationButtons.forEach(button => {
  button.addEventListener('click', function() {
    const duration = this.getAttribute('data-duration');
    const cost = this.getAttribute('data-cost');
    // Set the dynamic duration and price in the hidden form fields
    document.getElementById('duration-input').value = duration;
    document.getElementById('price-input').value = cost;
    // Show the form
    checkoutForm.style.display = 'block';
  });
});