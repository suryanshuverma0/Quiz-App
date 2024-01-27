function createStartButton() {
  const startBtn = document.createElement("button");
  const app = document.querySelector(".quiz-app");
  startBtn.id = "start";
  startBtn.type = "button";
  startBtn.innerHTML = "Start";
  app.appendChild(startBtn);
  return startBtn;
}
function createSubmitButton() {
  const submitBtn = document.createElement("button");
  const app = document.querySelector(".quiz-app");
  submitBtn.id = "submit";
  submitBtn.type = "button";
  submitBtn.innerHTML = "Submit";
  app.appendChild(submitBtn);
  return submitBtn;
}

function createNexttButton() {
  const nextBtn = document.createElement("button");
  const app = document.querySelector(".quiz-app");
  nextBtn.id = "next";
  nextBtn.innerHTML = "Next";
  nextBtn.type = "button";
  app.appendChild(nextBtn);
  return nextBtn;
}

function createPreviousButton() {
  const previousBtn = document.createElement("button");
  const app = document.querySelector(".quiz-app");
  previousBtn.id = "previous";
  previousBtn.type = "button";
  previousBtn.innerHTML = "Previous";
  app.appendChild(previousBtn);
  return previousBtn;
}

export {createStartButton , createSubmitButton , createNexttButton , createPreviousButton};

