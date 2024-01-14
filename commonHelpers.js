import"./assets/modulepreload-polyfill-ec808ebb.js";import{f as m,i as f}from"./assets/vendor-651d7991.js";let d;const t={dateInput:document.querySelector(".datetime-input"),startBtn:document.querySelector("button[data-start]"),timerDays:document.querySelector("span[data-days]"),timerHours:document.querySelector("span[data-hours]"),timerMinutes:document.querySelector("span[data-minutes]"),timerSeconds:document.querySelector("span[data-seconds]")};t.startBtn.disabled=!0;t.dateInput.disabled=!1;const p={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){e[0].getTime()>Date.now()?(d=e[0].getTime(),t.startBtn.disabled=!1,t.startBtn.classList.remove("disabled")):(f.show({class:"error-svg",position:"topRight",icon:"error-svg",message:"Please choose a date in the future!",messageColor:"#fff",messageSize:"16px",backgroundColor:"#EF4040",close:!1,closeOnClick:!0}),t.startBtn.disabled=!0,t.startBtn.classList.add("disabled"))}};m("#datetime-picker",p);t.startBtn.addEventListener("click",e=>{const r=setInterval(()=>{const o=d-Date.now(),s=n(o);o<=0?(clearInterval(r),t.startBtn.disabled=!1,t.startBtn.classList.remove("disabled"),t.dateInput.disabled=!1,t.dateInput.classList.remove("disabled")):(t.timerDays.textContent=a(s.days),t.timerHours.textContent=a(s.hours),t.timerMinutes.textContent=a(s.minutes),t.timerSeconds.textContent=a(s.seconds))},1e3);t.startBtn.disabled=!0,t.startBtn.classList.add("disabled"),t.dateInput.disabled=!0,t.dateInput.classList.add("disabled")});function a(e){return e=String(e),e.length<2?e.padStart(2,"0"):e}function n(e){const i=Math.floor(e/864e5),c=Math.floor(e%864e5/36e5),l=Math.floor(e%864e5%36e5/6e4),u=Math.floor(e%864e5%36e5%6e4/1e3);return{days:i,hours:c,minutes:l,seconds:u}}console.log(n(2e3));console.log(n(14e4));console.log(n(2414e4));
//# sourceMappingURL=commonHelpers.js.map