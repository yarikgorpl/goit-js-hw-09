import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
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
refs.start.style.borderRadius = '3px';

refs.day.style.padding = '10px';
refs.day.style.width = '50px';
refs.day.style.borderRadius = '50%';
refs.day.style.background = 'blue';
refs.day.style.display = 'flex';
refs.day.style.marginTop = '20px';
refs.day.style.flexDirection = 'column';

refs.hour.style.padding = '10px';
refs.hour.style.width = '50px';
refs.hour.style.borderRadius = '50%';
refs.hour.style.background = 'yellow';
refs.hour.style.display = 'flex';
refs.hour.style.marginTop = '20px';
refs.hour.style.flexDirection = 'column';

refs.minute.style.padding = '10px';
refs.minute.style.width = '50px';
refs.minute.style.borderRadius = '50%';
refs.minute.style.background = 'red';
refs.minute.style.display = 'flex';
refs.minute.style.marginTop = '20px';
refs.minute.style.flexDirection = 'column';

refs.second.style.padding = '10px';
refs.second.style.width = '50px';
refs.second.style.borderRadius = '50%';
refs.second.style.background = 'black';
refs.second.style.display = 'flex';
refs.second.style.marginTop = '20px';
refs.second.style.flexDirection = 'column';

refs.timer.style.fontSize = '16px';
refs.timer.style.textAlign = 'center';
refs.timer.style.fontWeight = '700';
refs.timer.style.display = 'flex';
refs.timer.style.color = 'violet';
refs.timer.style.gap = '10px';

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
      if (
        refs.day.textContent === '00' &&
        refs.hour.textContent === '00' &&
        refs.minute.textContent === '00' &&
        refs.second.textContent === '00'
      ) {
        clearInterval(this.intervalId);
        this.isActive = false;
        Notiflix.Notify.success('Time is out');
      }
    }, 1000);
  },
};

function updateTimer({ days, hours, minutes, seconds }) {
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
