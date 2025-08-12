// document.getElementById("submitBtn").addEventListener("click", function () {
//   const resultsBox = document.getElementById("resultsBox");
//   resultsBox.innerHTML = "";

let currentQuestion = 0;
let answers = {};
const totalQuestions = 3;

// Personality results - add in images later
const personalityResults = {
    'result1': {
    image: 'img1.jpg',
    title: 'Result 1 Title',
    description: 'Description for result 1',
    },
    'result2': {
    image: 'img2.jpg',
    title: 'Result 2 Title',
    description: 'Description for result 2',
    },
    'result3': {
    image: 'img3.jpg',
    title: 'Result 3 Title',
    description: 'Description for result 3',
    },
    'result4': {
    image: 'img4.jpg',
    title: 'Result 4 Title',
    description: 'Description for result 4',
    }
};

function startQuiz() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('question-1').classList.add('active');
    document.getElementById('navigation').classList.add('active');
    currentQuestion = 1;
}

function selectOption(element) {
    const questionContainer = element.closest('.quiz-screen');
    const options = questionContainer.querySelectorAll('.option');

    // Unselect all options in the current question
    options.forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');

    const questionNumber = currentQuestion;
    answers[questionNumber] = element.getAttribute('data-value');

    document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
    if (currentQuestion < totalQuestions) {
    document.getElementById(`question-${currentQuestion}`).classList.remove('active');
    currentQuestion++;
    document.getElementById(`question-${currentQuestion}`).classList.add('active');
    
    // Reset next button
    document.getElementById('nextBtn').disabled = !answers[currentQuestion];
    
    // Show/hide previous button
    document.getElementById('prevBtn').style.display = currentQuestion > 1 ? 'inline-block' : 'none';
    
    // Update button text for last question
    if (currentQuestion === totalQuestions) {
        document.getElementById('nextBtn').textContent = 'Get Results';
        document.getElementById('nextBtn').onclick = showResults;
    }
    }
}

function previousQuestion() {
    if (currentQuestion > 1) {
    document.getElementById(`question-${currentQuestion}`).classList.remove('active');
    currentQuestion--;
    document.getElementById(`question-${currentQuestion}`).classList.add('active');
    
    // Update buttons
    document.getElementById('nextBtn').disabled = false;
    document.getElementById('nextBtn').textContent = 'Next';
    document.getElementById('nextBtn').onclick = nextQuestion;
    document.getElementById('prevBtn').style.display = currentQuestion > 1 ? 'inline-block' : 'none';
    }
}

function calculateResult() {
    const scores = {
    'result1': 0,
    'result2': 0,
    'result3': 0,
    'result4': 0
    };

    // Question 1 scoring
    if (answers[1] === 'option-1A') scores['result1'] += 3;
    if (answers[1] === 'option-1B') scores['result2'] += 3;
    if (answers[1] === 'option-1C') scores['result3'] += 3;
    if (answers[1] === 'option-1D') scores['result4'] += 3;

    // Question 2 scoring
    if (answers[2] === 'option-2A') scores['result1'] += 2;
    if (answers[2] === 'option-2B') scores['result2'] += 2;
    if (answers[2] === 'option-2C') scores['result3'] += 2;
    if (answers[2] === 'option-2D') scores['result4'] += 2;

    // Question 3 scoring
    if (answers[3] === 'option-3A') scores['result1'] += 1;
    if (answers[3] === 'option-3B') scores['result2'] += 1;
    if (answers[3] === 'option-3C') scores['result3'] += 1;
    if (answers[3] === 'option-3D') scores['result4'] += 1;

    // Find the personality with the highest score
    return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
}

function showResults() {
    // Hide current question and navigation
    document.getElementById(`question-${currentQuestion}`).classList.remove('active');
    document.getElementById('navigation').classList.remove('active');

    const personalityType = calculateResult();
    const personality = personalityResults[personalityType];

    const resultHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
        <img src="${personality.image}" alt="Result Image" style="width: 200px; height: 200px; border-radius: 12px; margin-bottom: 20px;">
    </div>
    <h2 class="result-title">${personality.title}</h2>
    <p class="result-description">${personality.description}</p>
    `;

    document.getElementById('result-content').innerHTML = resultHTML;
    document.getElementById('results').classList.add('active');
}

function restartQuiz() {
    // Reset variables
    currentQuestion = 0;
    answers = {};

    // Hide results and show intro
    document.getElementById('results').classList.remove('active');
    document.getElementById('intro').style.display = 'block';

    // Hide all question screens
    document.querySelectorAll('.quiz-screen').forEach(q => {
    q.classList.remove('active');
    });

    // Reset all selections
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));

    // Reset navigation
    document.getElementById('navigation').classList.remove('active');
    document.getElementById('nextBtn').textContent = 'Next';
    document.getElementById('nextBtn').onclick = nextQuestion;
    document.getElementById('nextBtn').disabled = true;
    document.getElementById('prevBtn').style.display = 'none';
}

// Event delegation for option selection
document.addEventListener('click', function(e) {
    if (e.target.closest('.option')) {
    selectOption(e.target.closest('.option'));
    }
});


//   const resultsMap = {
//     q1: {
//       A: "Write some personalized results for option A",
//       B: "Write some personalized results for option B",
//       C: "Write some personalized results for option C"
//     },
//     q2: {
//       A: "Write some personalized results for option A",
//       B: "Write some personalized results for option B",
//       C: "Write some personalized results for option C"
//     }
//   };

//   const allQuestions = Object.keys(resultsMap);
//   let allAnswered = true;

//   allQuestions.forEach((qid, index) => {
//     const selected = document.querySelector(`input[name="${qid}"]:checked`);
//     const resultDiv = document.createElement("div");
//     resultDiv.classList.add("result-item");

//     if (selected) {
//       const choiceValue = selected.value;
//       resultDiv.innerHTML = `
//         <p><strong>Question ${index + 1}:</strong></p>
//         <p><em>You chose:</em> ${selected.parentElement.textContent.trim()}</p>
//         <p class="result-message">${resultsMap[qid][choiceValue]}</p>
//       `;
//     } else {
//       resultDiv.innerHTML = `<p><strong>Question ${index + 1}:</strong> Not answered.</p>`;
//       allAnswered = false;
//     }

//     resultsBox.appendChild(resultDiv);
//   });

//   if (!allAnswered) {
//     alert("Please answer all questions!");
//     return;
//   }

//   resultsBox.style.display = "block";
// });