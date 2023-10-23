import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      startBtn.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    }
  },
};

let timerId = null;

const onClick = () => {
  if (startBtn.disabled) {
    return;
  }

  if (timerId) {
    clearInterval(timerId);
  }
  const selectedDate = new Date(dateTimePicker.value);
  timerId = setInterval(() => {
    const currentTime = new Date();
    const countdown = selectedDate - currentTime;

    if (countdown <= 0) {
      clearInterval(timerId);
      return;
    }
    function addLeadingZero(value) {
      return value.toString().padStart(2, '0');
    }
    const periodOfTime = convertMs(countdown);
    daysElement.textContent = addLeadingZero(periodOfTime.days);
    hoursElement.textContent = addLeadingZero(periodOfTime.hours);
    minutesElement.textContent = addLeadingZero(periodOfTime.minutes);
    secondsElement.textContent = addLeadingZero(periodOfTime.seconds);
  }, 1000);
};

startBtn.addEventListener('click', onClick);

flatpickr(dateTimePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
