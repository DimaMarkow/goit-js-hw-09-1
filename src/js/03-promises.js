const refs = {
  form: document.querySelector(`.form`),
};

refs.form.addEventListener(`submit`, handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = event.currentTarget.elements.delay.value;
  const step = event.currentTarget.elements.step.value;
  const amount = event.currentTarget.elements.amount.value;

  for (let i = 0; i < amount; i += 1) {
    let stepDelay = Number.parseInt(delay) + i * Number.parseInt(step);
    createPromise(i + 1, stepDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
