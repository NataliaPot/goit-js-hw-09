const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timer = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function setBtnDisabledState(startDisabled, stopDisabled) {
  startBtn.disabled = startDisabled;
  stopBtn.disabled = stopDisabled;
}

function setBtnCursorState(startCursor, stopCursor) {
  startBtn.style.cursor = startCursor;
  stopBtn.style.cursor = stopCursor;
}

startBtn.addEventListener('click', () => {
  setBtnDisabledState(true, false);
  setBtnCursorState('not-allowed', 'pointer');
  timer = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  setBtnDisabledState(false, true);
  setBtnCursorState('pointer', 'not-allowed');
  clearInterval(timer);
  document.body.style.backgroundColor = '';
});
