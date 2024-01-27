import {
  createStartButton,
  createSubmitButton,
  createNexttButton,
  createPreviousButton,
} from "./buttons.mjs";

let currentQuestionIndex = 0;
async function fetchData() {
  try {
    const response = await fetch("./question.json");

    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status code: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Fetch error:", e);
  }
}

function displayQuestion(data) {
  const questionContainer = document.getElementById("question");
  const optionsContainer = document.querySelector(".options");

  const question = data.questions[currentQuestionIndex].text;
  questionContainer.textContent = question;

  const options = data.questions[currentQuestionIndex].options;
  let optionsHTML = "";
  options.forEach((option, index) => {
    optionsHTML += `
      <div id="contents">
        <input type="checkbox" value="${option.id}" id="opt${
      index + 1
    }" aria-label="opt-${index + 1}">
        <label htmlFor="opt${index + 1}" id="op${index + 1}">${
      option.text
    }</label>
      </div>
    `;
  });
  optionsContainer.innerHTML = optionsHTML;
}
const nextButton = createNexttButton();
const previousButton = createPreviousButton();
nextButton.style.display = "none";
previousButton.style.display = "none";

const startBtn = createStartButton();
startBtn.addEventListener("click", () => {
  fetchData().then((data) => {
    startBtn.style.display = "none";
    nextButton.style.display = "block";
    previousButton.style.display = "block";
    displayQuestion(data);

    nextButton.addEventListener("click", () => {
      if (currentQuestionIndex < data.questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(data);
      }
    });

    previousButton.addEventListener("click", () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(data);
      }
    }).catch((error) => {
      throw new Error("Error showing the message" , error);
    });
  });
});
