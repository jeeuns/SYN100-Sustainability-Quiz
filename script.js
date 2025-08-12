document.getElementById("submitBtn").addEventListener("click", function () {
  const resultsBox = document.getElementById("resultsBox");
  resultsBox.innerHTML = "";

  // Define personalized results mapping per question & choice
  const resultsMap = {
    q1: {
      A: "Write some personalized results for option A",
      B: "Write some personalized results for option B",
      C: "Write some personalized results for option C"
    },
    q2: {
      A: "Write some personalized results for option A",
      B: "Write some personalized results for option B",
      C: "Write some personalized results for option C"
    }
  };

  const allQuestions = Object.keys(resultsMap);
  let allAnswered = true;

  allQuestions.forEach((qid, index) => {
    const selected = document.querySelector(`input[name="${qid}"]:checked`);
    const resultDiv = document.createElement("div");
    resultDiv.classList.add("result-item");

    if (selected) {
      const choiceValue = selected.value;
      resultDiv.innerHTML = `
        <p><strong>Question ${index + 1}:</strong></p>
        <p><em>You chose:</em> ${selected.parentElement.textContent.trim()}</p>
        <p class="result-message">${resultsMap[qid][choiceValue]}</p>
      `;
    } else {
      resultDiv.innerHTML = `<p><strong>Question ${index + 1}:</strong> Not answered.</p>`;
      allAnswered = false;
    }

    resultsBox.appendChild(resultDiv);
  });

  if (!allAnswered) {
    alert("Please answer all questions!");
    return;
  }

  resultsBox.style.display = "block";
});