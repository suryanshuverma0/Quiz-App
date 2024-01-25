let currentQuestionIndex = 0;
async function fetchData() {
  try {
    const optionsContainer = document.querySelector(".options");

    const response = await fetch("./question.json");

    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status code: ${response.status}`
      );
    }

    const data = await response.json();

    let allQuestionsHTML = "";

    for (
      currentQuestionIndex = 0;
      currentQuestionIndex < data.questions.length;
      currentQuestionIndex++
    ) {
      const options = data.questions[currentQuestionIndex].options;
      let optionsHTML = "";

      options.forEach((option, index) => {
        optionsHTML += `
        <div id = "contents">
          <input type="checkbox" value="${option.id}" id="opt${index + 1
          }" aria-label="opt-${index + 1}">
          <label htmlFor="opt${index + 1}" id="op${index + 1}">${option.text
          }</label>
          </div>
        `;
      });

      allQuestionsHTML += `
        <div>
          <p>${data.questions[currentQuestionIndex].text}</p>
          <div class="options">
            ${optionsHTML}
          </div>
        </div>
      `;
    }
    optionsContainer.innerHTML = allQuestionsHTML;
  } catch (e) {
    console.error("Fetch error:", e);
  }
}

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

const startBtn = createStartButton();
startBtn.addEventListener("click", () => {
  fetchData();
  const submitBtn = createSubmitButton();
  startBtn.style.display = "none";
});


