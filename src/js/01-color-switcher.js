const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timer = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  startBtn.style.cursor = 'not-allowed';
  stopBtn.style.cursor = 'pointer';
  timer = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  startBtn.style.cursor = 'pointer';
  stopBtn.style.cursor = 'not-allowed';
  clearInterval(timer);
  document.body.style.backgroundColor = '';
});
