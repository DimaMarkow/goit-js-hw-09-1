const DELAY = 1000;

const refs = {
  start: document.querySelector(`button[data-start]`),
  stop: document.querySelector(`button[data-stop]`),
  body: document.querySelector(`body`),
};

const colorSwitcher = {
  intervalID: null,
  isActive: false,

  onStart() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    this.intervalID = setInterval(() => {
      console.log(`меняем цвет`);
      refs.body.style.backgroundColor = getRandomHexColor();
    }, DELAY);
  },

  onStop() {
    clearInterval(this.intervalID);
    this.isActive = false;
  },
};

refs.start.addEventListener(`click`, () => {
  colorSwitcher.onStart();
});

refs.stop.addEventListener(`click`, () => {
  colorSwitcher.onStop();
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
