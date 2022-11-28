import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector(`button[data-start]`),
  daysField: document.querySelector(`span[data-days]`),
  hoursField: document.querySelector(`span[data-hours]`),
  minutesField: document.querySelector(`span[data-minutes]`),
  secondsField: document.querySelector(`span[data-seconds]`),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    console.log(selectedDates[0].getTime());

    localStorage.setItem(
      'settledTime',
      JSON.stringify(selectedDates[0].getTime())
    );
  },
};

const timer = {
  intervalID: null,
  isActive: false,

  onStart() {
    if (this.isActive) {
      return;
    }

    const finalDate = JSON.parse(localStorage.getItem('settledTime'));

    if (finalDate <= Date.now()) {
      window.alert('Please choose a date in the future');
      return;
    }

    this.isActive = true;

    this.intervalID = setInterval(() => {
      const currentDate = Date.now();
      const deltaTime = finalDate - currentDate;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);

      updateClockface(days, hours, minutes, seconds);

      console.log(`${days}::${hours}::${minutes}::${seconds}`);

      if (
        days === `00` &&
        hours === `00` &&
        minutes === `00` &&
        seconds === `00`
      ) {
        clearInterval(this.intervalID);
        this.isActive = false;
      }
    }, 1000);
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener(`click`, () => {
  timer.onStart();
});

function addLeadingZero(value) {
  return String(value).padStart(2, `0`);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function updateClockface(days, hours, minutes, seconds) {
  refs.daysField.textContent = days;
  refs.hoursField.textContent = hours;
  refs.minutesField.textContent = minutes;
  refs.secondsField.textContent = seconds;
}
