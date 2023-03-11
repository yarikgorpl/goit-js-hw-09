import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates <= Date.now()) {
      refs.start.setAttribute('disabled', true);
      return alert('Please choose a date in the future');
    }
    refs.start.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);

const refs = {
  input: document.querySelector('#datetime-picker'),
  start: document.querySelector('[data-start]'),
  day: document.querySelector('[data-days]'),
  hour: document.querySelector('[data-hours]'),
  minute: document.querySelector('[data-minutes]'),
  second: document.querySelector('[data-seconds]'),
  timer: document.querySelector('.timer'),
};

refs.start.setAttribute('disabled', true);

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    const startTime = new Date(refs.input.value).getTime();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = convertMs(deltaTime);

      updateTimer(time);
      if (deltaTime <= 0) {
        updateTimer();
        clearInterval(this.intervalId);
        this.isActive = false;
        Notiflix.Notify.success('Time is out');
      }
    }, 1000);
  },
};

function updateTimer({ days = 0, hours = 0, minutes = 0, seconds = 0 } = {}) {
  refs.day.textContent = `${days}`;
  refs.hour.textContent = `${hours}`;
  refs.minute.textContent = `${minutes}`;
  refs.second.textContent = `${seconds}`;
}

refs.start.addEventListener('click', () => {
  refs.start.setAttribute('disabled', true);
  timer.start();
});
function pad(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
