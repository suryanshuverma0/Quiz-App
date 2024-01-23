let currentQuestionIndex = 0;
async function fetchData() {
  try {
    const question = document.getElementById("question");
    const optionsContainer = document.querySelector(".options");

    const response = await fetch("./question.json");

    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status code: ${response.status}`
      );
    }

    const data = await response.json();
  
    question.textContent = data.questions[currentQuestionIndex].text;
    const options = data.questions[currentQuestionIndex].options;
    options.forEach((option, index) => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = option.id;
      checkbox.id = `opt${index + 1}`;
      checkbox.ariaLabel = `opt-${index + 1}`;

      const label = document.createElement('label');
      label.htmlFor = `opt${index + 1}`;
      label.id = `op${index + 1}`;
      label.textContent = data.questions[currentQuestionIndex].options[currentQuestionIndex].text;

      optionsContainer.appendChild(checkbox);
      optionsContainer.appendChild(label);

    });
  } catch (e) {
    console.error("Fetch error:", e);
  }
}

fetchData();
