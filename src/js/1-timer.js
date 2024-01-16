import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = 0;

const refs = {
  dateInput: document.querySelector('.datetime-input'),
  startBtn: document.querySelector('button[data-start]'),
  timerDays: document.querySelector('span[data-days]'),
  timerHours: document.querySelector('span[data-hours]'),
  timerMinutes: document.querySelector('span[data-minutes]'),
  timerSeconds: document.querySelector('span[data-seconds]'),
};
refs.startBtn.disabled = true;
refs.dateInput.disabled = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      userSelectedDate = selectedDates[0].getTime();

      refs.startBtn.disabled = false;
      refs.startBtn.classList.remove('disabled');
    } else {
      iziToast.show({
        class: 'error-svg',
        position: 'topRight',
        icon: 'error-svg',
        message: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M3.75001 12C3.74979 10.5518 4.13082 9.12893 4.85482 7.87459C5.57882 6.62026 6.62026 5.57861 7.87445 4.85437C9.12865 4.13013 10.5514 3.74881 11.9997 3.74876C13.448 3.7487 14.8708 4.1299 16.125 4.85405C16.2972 4.95193 16.5011 4.97775 16.6922 4.92586C16.8833 4.87397 17.0462 4.74858 17.1452 4.57707C17.2442 4.40555 17.2714 4.20183 17.2208 4.01036C17.1702 3.81888 17.0459 3.65521 16.875 3.55505C15.0163 2.48192 12.8554 2.05208 10.7275 2.33219C8.59964 2.61229 6.62362 3.5867 5.10594 5.10428C3.58826 6.62186 2.61373 8.59782 2.33349 10.7257C2.05324 12.8536 2.48294 15.0145 3.55595 16.8733C4.62896 18.732 6.28531 20.1848 8.26813 21.0063C10.2509 21.8278 12.4494 21.9721 14.5226 21.4168C16.5958 20.8615 18.4278 19.6377 19.7345 17.9351C21.0413 16.2325 21.7497 14.1463 21.75 12C21.75 11.8011 21.671 11.6104 21.5303 11.4697C21.3897 11.3291 21.1989 11.25 21 11.25C20.8011 11.25 20.6103 11.3291 20.4697 11.4697C20.329 11.6104 20.25 11.8011 20.25 12C20.25 14.1881 19.3808 16.2865 17.8336 17.8337C16.2865 19.3809 14.188 20.25 12 20.25C9.81198 20.25 7.71356 19.3809 6.16638 17.8337C4.61921 16.2865 3.75001 14.1881 3.75001 12Z" fill="white"/>
<path d="M23.031 5.03097C23.1007 4.96124 23.156 4.87846 23.1938 4.78735C23.2315 4.69624 23.2509 4.59859 23.2509 4.49997C23.2509 4.40135 23.2315 4.3037 23.1938 4.2126C23.156 4.12149 23.1007 4.0387 23.031 3.96897C22.9612 3.89924 22.8785 3.84392 22.7873 3.80619C22.6962 3.76845 22.5986 3.74902 22.5 3.74902C22.4014 3.74902 22.3037 3.76845 22.2126 3.80619C22.1215 3.84392 22.0387 3.89924 21.969 3.96897L12 13.9395L8.03097 9.96897C7.96124 9.89924 7.87846 9.84392 7.78735 9.80619C7.69624 9.76845 7.59859 9.74902 7.49997 9.74902C7.40136 9.74902 7.3037 9.76845 7.2126 9.80619C7.12149 9.84392 7.0387 9.89924 6.96897 9.96897C6.89924 10.0387 6.84392 10.1215 6.80619 10.2126C6.76845 10.3037 6.74902 10.4014 6.74902 10.5C6.74902 10.5986 6.76845 10.6962 6.80619 10.7873C6.84392 10.8785 6.89924 10.9612 6.96897 11.031L11.469 15.531C11.5386 15.6008 11.6214 15.6562 11.7125 15.694C11.8036 15.7318 11.9013 15.7513 12 15.7513C12.0986 15.7513 12.1963 15.7318 12.2874 15.694C12.3785 15.6562 12.4613 15.6008 12.531 15.531L23.031 5.03097Z" fill="white"/>
</svg>   Please choose a date in the future!`,
        messageColor: '#fff',
        messageSize: '16px',
        backgroundColor: '#EF4040',
        close: false,
        closeOnClick: true,
      });

      refs.startBtn.disabled = true;
      refs.startBtn.classList.add('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', elem => {
  const timer = setInterval(() => {
    const diff = userSelectedDate - Date.now();
    const timeValue = convertMs(diff);
    if (diff <= 0) {
      clearInterval(timer);
      refs.dateInput.disabled = false;
      refs.dateInput.classList.remove('disabled');
    } else {
      refs.timerDays.textContent = addLeadingZero(timeValue.days);
      refs.timerHours.textContent = addLeadingZero(timeValue.hours);
      refs.timerMinutes.textContent = addLeadingZero(timeValue.minutes);
      refs.timerSeconds.textContent = addLeadingZero(timeValue.seconds);
    }
  }, 1000);
  refs.startBtn.disabled = true;
  refs.startBtn.classList.add('disabled');
  refs.dateInput.disabled = true;
  refs.dateInput.classList.add('disabled');
});

function addLeadingZero(value) {
  value = String(value);
  return value.length < 2 ? value.padStart(2, '0') : value;
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
