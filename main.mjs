import {
  createStartButton,
  createSubmitButton,
  createNexttButton,
  createPreviousButton,
} from "./buttons.mjs";

const toggleMode = document.getElementById("toggleMode");
let isDarkMode = false;
const switchMode = document.getElementById("switch");
switchMode.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    toggleMode.href = "dark.css";
    switchMode.innerHTML = `<i class="fas fa-sun"></i>`;
    switchMode.style.transition = "background-color 0.3s ease";
  } else {
    toggleMode.href = "light.css";
    switchMode.innerHTML = `<i class="fas fa-moon"></i>`;
    switchMode.style.transition = "background-color 0.3s ease";
  }
});
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
        <input type="radio" value="${option.id}" id="opt${
      index + 1
    }" name="option" aria-label="opt-${index + 1}">
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
const submitBtn = createSubmitButton();
submitBtn.style.display = "none";
nextButton.style.display = "none";
previousButton.style.display = "none";
const startBtn = createStartButton();
startBtn.addEventListener("click", () => {
  fetchData().then((data) => {
    startBtn.style.display = "none";
    nextButton.style.display = "block";
    previousButton.style.display = "block";
    displayQuestion(data);

    if (currentQuestionIndex === 0) {
      previousButton.style.display = "none";
    }
    if (currentQuestionIndex === data.questions.length - 1) {
      nextButton.style.display = "none";
      submitBtn.style.display = "block";
    }

    const textDiv = document.getElementById("text");
    nextButton.addEventListener("click", () => {
      if (currentQuestionIndex < data.questions.length - 1) {
        currentQuestionIndex++;
        textDiv.textContent = `${
          10 - currentQuestionIndex
        }/10 questions remaining`;
        displayQuestion(data);
        previousButton.style.display = "block";
      }

      // Check if it's the last question after moving to the next
      if (currentQuestionIndex === data.questions.length - 1) {
        nextButton.style.display = "none";
        submitBtn.style.display = "block";
      }
    });

    previousButton.addEventListener("click", () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        textDiv.textContent = `${Math.abs(
          currentQuestionIndex - 10
        )}/10 questions remaining`;
        displayQuestion(data);
      }

      // Check if it's not the last question after moving to the previous
      if (currentQuestionIndex < data.questions.length - 1) {
        nextButton.style.display = "block";
        submitBtn.style.display = "none";
      }
    });
  });
});
