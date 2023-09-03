function calculateTimeRemaining(targetDate) {
  const currentDate = new Date();
  const timeRemaining = targetDate - currentDate;

  if (timeRemaining <= 0) {
    return { expired: true };
  } else {
    const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesRemaining = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return {
      days: daysRemaining,
      hours: hoursRemaining,
      minutes: minutesRemaining,
      seconds: secondsRemaining,
      expired: false,
    };
  }
}

function logRemainingTime(targetDate, timerInfo) {
  if (timerInfo.expired) {
    clearInterval(timerInterval);
    console.log('Timer expired!');
  } else {
    const currentDate = new Date();
    const options = {
      timeZone: 'America/New_York', // Eastern Standard Time (EST)
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const formattedDateTime = currentDate.toLocaleString('en-US', options);

    console.log(`Current time countdown: ${formattedDateTime} at (${timerInfo.days}d ${timerInfo.hours}h ${timerInfo.minutes}m ${timerInfo.seconds}s)`);
  }
}

function updateTimer(days, hours, minutes, seconds) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + days);
  targetDate.setHours(targetDate.getHours() + hours);
  targetDate.setMinutes(targetDate.getMinutes() + minutes);
  targetDate.setSeconds(targetDate.getSeconds() + seconds);

  function updateAndLogTime() {
    const timerInfo = calculateTimeRemaining(targetDate);
    logRemainingTime(targetDate, timerInfo);
  }

  updateAndLogTime(); // Initial calculation

  const timerInterval = setInterval(updateAndLogTime, 1000); // Update every second
}

function checkoutTimer(days, hours, minutes, seconds) {
  console.log(`Selected time: ${days}d ${hours}h ${minutes}m ${seconds}s`);
  updateTimer(days, hours, minutes, seconds); // Start the timer
}
