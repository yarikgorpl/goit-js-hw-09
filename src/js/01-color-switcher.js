function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let timerId = null;

const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

const clickOnStart = refs.start.addEventListener('click', () => {
  refs.start.setAttribute('disabled', true);
  timerId = setInterval(() => {
    const color = getRandomHexColor();
    refs.body.style.backgroundColor = color;
  }, 1000);
});

const clickOnStop = refs.stop.addEventListener('click', () => {
  clearInterval(timerId);
  refs.start.removeAttribute('disabled');
});
