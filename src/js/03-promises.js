import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};
refs.form.addEventListener('submit', clickOnButtonCreate);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function clickOnButtonCreate(event) {
  event.preventDefault();
  let delay = +event.target.delay.value;
  let step = +event.target.step.value;
  let amount = +event.target.amount.value;

  if ([delay, step, amount].find(value => value < 0)) {
    Notify.failure('Make correct value >0 ');
    return;
  }

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}
