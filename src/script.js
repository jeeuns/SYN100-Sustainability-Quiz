// document.getElementById("submitBtn").addEventListener("click", function () {
//   const resultsBox = document.getElementById("resultsBox");
//   resultsBox.innerHTML = "";

let currentQuestion = 0;
let answers = {};
const totalQuestions = 14; //dont forget to update when making more questions

// Personality results - add in images later
const personalityResults = {
    'result1': {
    image: 'img1.jpg',
    title: 'Eco-Warrior Elephant',
    description: 'Description for result 1',
    quote: '',
    threshhold: 80 //80% average score
    },
    'result2': {
    image: 'img2.jpg',
    title: 'Thrifty Tiger',
    description: 'Tiger is the bold shopper who seeks treasures responsibly. They represent smart, sustainable buying habits and fiercely believe that thrifting is a way to play a part in helping their environment.',
    quote: '“Wild about second-hand!”',
    threshhold: 60 //60-79% average score
    },
    'result3': {
    image: 'img3.jpg',
    title: 'Sustainable Sloth',
    description: 'Sloth is all about slowing down, re-wearing, and taking good care of what they already own. They symbolize patience, perseverance, and know that caring for their clothes is caring for the planet.',
    quote: '“Longer-lasting clothing is the most sustainable clothing!”',
    threshhold: 40 //40-59% average score
    },
    'result4': {
    image: 'img4.jpg',
    title: 'Polyester Penguin',
    description: 'Penguin represents people who love trends and convenience but are starting to realize they may need to shift their habits. They are evolving into a greener wardrobe and turning awareness into action.',
    quote: '“Even if you’ve been swimming in fast fashion, you can always change direction!”',
    threshhold: 0 //0-39% average score
    }
};

const categories = {
    'sustainablePurchasing': {
        name: 'Sustainable Purchasing',
        description: 'sustainable purchasing practice',
        image: 'assets/moneybag.png',
    },
    'environmentalAwareness': {
        name: 'Environmental Awareness',
        description: 'understanding of fast fashion impact',
        image: 'assets/earth.png',
    },
    'clothingCare': {
        name: 'Clothing Care',
        description: 'best practices for clothing care',
        image: 'assets/tshirt.png',
    },
    'attitude': {
        name: 'Climate Attitude',
        description: 'sustainable practices for your mental health',
        image: 'assets/face.png',
    },
};

const questionsWithSubmit = [7, 14]; // Add more if needed

const correctAnswers = {
    7: 'option-7A',
    13: 'option-13C',
    14: 'option-14B',
    // add more correct-answer questions here
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

    if (questionsWithSubmit.includes(currentQuestion)) {
        document.getElementById('submitBtn').style.display = 'inline-block';
        document.getElementById('nextBtn').style.display = 'none';
    } else {
        document.getElementById('nextBtn').disabled = false;
    }
}

function submitAnswer() {
    const currentContainer = document.getElementById(`question-${currentQuestion}`);
    const selectedOption = currentContainer.querySelector('.option.selected');

    if (!selectedOption) return;

    const allOptions = currentContainer.querySelectorAll('.option');
    const correct = correctAnswers[currentQuestion];

    allOptions.forEach(opt => {
        opt.classList.remove('selected')
        opt.classList.remove('correct', 'incorrect');
        const value = opt.getAttribute('data-value');

        if (value === correct) {
            opt.classList.add('correct');
        }

        if (selectedOption.getAttribute('data-value') !== correct && selectedOption === opt) {
            opt.classList.add('incorrect');
        }
    });

    // Hide Submit, show Next after feedback
    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'inline-block';
    document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        document.getElementById(`question-${currentQuestion}`).classList.remove('active');
        currentQuestion++;
        document.getElementById(`question-${currentQuestion}`).classList.add('active');

        document.getElementById('submitBtn').style.display = questionsWithSubmit.includes(currentQuestion) ? 'inline-block' : 'none';
        document.getElementById('nextBtn').style.display = questionsWithSubmit.includes(currentQuestion) ? 'none' : 'inline-block';
        document.getElementById('nextBtn').disabled = !answers[currentQuestion];

        document.getElementById('prevBtn').style.display = currentQuestion > 1 ? 'inline-block' : 'none';

        if (currentQuestion === totalQuestions) {
            document.getElementById('nextBtn').textContent = 'Get Results';
            document.getElementById('nextBtn').onclick = showResults;
        } else {
            document.getElementById('nextBtn').textContent = 'Next';
            document.getElementById('nextBtn').onclick = nextQuestion;
        }
    }
}

function goToNext() {
    if (currentQuestion < totalQuestions) {
        document.getElementById(`question-${currentQuestion}`).classList.remove('active');
        currentQuestion++;
        document.getElementById(`question-${currentQuestion}`).classList.add('active');

        document.getElementById('nextBtn').disabled = !answers[currentQuestion];
        document.getElementById('prevBtn').style.display = currentQuestion > 1 ? 'inline-block' : 'none';

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

function calculateCategoryScores() {
    const scores = {
    'sustainablePurchasing': 0,
    'environmentalAwareness': 0,
    'clothingCare': 0,
    'attitude': 0
    };

// Question 1 scoring - adjust these based on actual questions
    if (answers[1] === 'option-1A') {
        scores['sustainablePurchasing'] += 25;
        scores['environmentalAwareness'] += 20;
    }
    if (answers[1] === 'option-1B') {
        scores['sustainablePurchasing'] += 15;
        scores['attitude'] += 20;
    }
    if (answers[1] === 'option-1C') {
        scores['clothingCare'] += 20;
        scores['attitude'] += 15;
    }
    if (answers[1] === 'option-1D') {
        scores['sustainablePurchasing'] += 5;
        scores['environmentalAwareness'] += 10;
    }

    // Question 2 scoring
    if (answers[2] === 'option-2A') {
        scores['clothingCare'] += 25;
        scores['environmentalAwareness'] += 20;
    }
    if (answers[2] === 'option-2B') {
        scores['clothingCare'] += 15;
        scores['attitude'] += 20;
    }
    if (answers[2] === 'option-2C') {
        scores['clothingCare'] += 10;
        scores['sustainablePurchasing'] += 15;
    }
    if (answers[2] === 'option-2D') {
        scores['clothingCare'] += 5;
        scores['attitude'] += 10;
    }

    // Question 3 scoring
    if (answers[3] === 'option-3A') {
        scores['attitude'] += 25;
        scores['environmentalAwareness'] += 20;
    }
    if (answers[3] === 'option-3B') {
        scores['attitude'] += 15;
        scores['sustainablePurchasing'] += 20;
    }
    if (answers[3] === 'option-3C') {
        scores['attitude'] += 10;
        scores['clothingCare'] += 15;
    }
    if (answers[3] === 'option-3D') {
        scores['attitude'] += 5;
        scores['environmentalAwareness'] += 10;
    }

    // Question 4 scoring
    if (answers[4] === 'option-4A') {
        scores['sustainablePurchasing'] += 25;
        scores['environmentalAwareness'] += 20;
    }
    if (answers[4] === 'option-4B') {
        scores['sustainablePurchasing'] += 15;
        scores['attitude'] += 20;
    }
    if (answers[4] === 'option-4C') {
        scores['clothingCare'] += 20;
        scores['attitude'] += 15;
    }
    if (answers[4] === 'option-4D') {
        scores['sustainablePurchasing'] += 5;
        scores['environmentalAwareness'] += 10;
    }

    // Question 5 scoring
    if (answers[5] === 'option-5A') {
        scores['sustainablePurchasing'] += 25;
        scores['environmentalAwareness'] += 20;
    }
    if (answers[5] === 'option-5B') {
        scores['sustainablePurchasing'] += 15;
        scores['attitude'] += 20;
    }
    if (answers[5] === 'option-5C') {
        scores['clothingCare'] += 20;
        scores['attitude'] += 15;
    }
    if (answers[5] === 'option-5D') {
        scores['sustainablePurchasing'] += 5;
        scores['environmentalAwareness'] += 10;
    }

    // Question 6 scoring
    if (answers[6] === 'option-6A') {
        scores['sustainablePurchasing'] += 25;
        scores['environmentalAwareness'] += 20;
    }
    if (answers[6] === 'option-6B') {
        scores['sustainablePurchasing'] += 15;
        scores['attitude'] += 20;
    }
    if (answers[6] === 'option-6C') {
        scores['clothingCare'] += 20;
        scores['attitude'] += 15;
    }
    if (answers[6] === 'option-6D') {
        scores['sustainablePurchasing'] += 5;
        scores['environmentalAwareness'] += 10;
    }

    // Question 7 scoring
    if (answers[7] === 'option-7A') {
        scores['sustainablePurchasing'] += 25;
        scores['environmentalAwareness'] += 20;
    }
    if (answers[7] === 'option-7B') {
        scores['sustainablePurchasing'] += 15;
        scores['attitude'] += 20;
    }
    if (answers[7] === 'option-7C') {
        scores['clothingCare'] += 20;
        scores['attitude'] += 15;
    }
    if (answers[7] === 'option-7D') {
        scores['sustainablePurchasing'] += 5;
        scores['environmentalAwareness'] += 10;
    }

    // Question 8 scoring
    if (answers[8] === 'option-8A') {
        scores['sustainablePurchasing'] += 25;
        scores['environmentalAwareness'] += 20;
    }
    if (answers[8] === 'option-8B') {
        scores['sustainablePurchasing'] += 15;
        scores['attitude'] += 20;
    }
    if (answers[8] === 'option-8C') {
        scores['clothingCare'] += 20;
        scores['attitude'] += 15;
    }
    if (answers[8] === 'option-8D') {
        scores['sustainablePurchasing'] += 5;
        scores['environmentalAwareness'] += 10;
    }

    // Question 9 scoring
    if (answers[9] === 'option-9A') {
        scores['sustainablePurchasing'] += 25;
        scores['environmentalAwareness'] += 20;
    }
    if (answers[9] === 'option-9B') {
        scores['sustainablePurchasing'] += 15;
        scores['attitude'] += 20;
    }
    if (answers[9] === 'option-9C') {
        scores['clothingCare'] += 20;
        scores['attitude'] += 15;
    }
    if (answers[9] === 'option-9D') {
        scores['sustainablePurchasing'] += 5;
        scores['environmentalAwareness'] += 10;
    }

    // Question 10 scoring
    if (answers[10] === 'option-10A') {
        scores['sustainablePurchasing'] += 25;
        scores['environmentalAwareness'] += 20;
    }
    if (answers[10] === 'option-10B') {
        scores['sustainablePurchasing'] += 15;
        scores['attitude'] += 20;
    }
    if (answers[10] === 'option-10C') {
        scores['clothingCare'] += 20;
        scores['attitude'] += 15;
    }
    if (answers[10] === 'option-10D') {
        scores['sustainablePurchasing'] += 5;
        scores['environmentalAwareness'] += 10;
    }

    // Question 11 scoring
    if (answers[11] === 'option-11A') {
        scores['sustainablePurchasing'] += 25;
        scores['environmentalAwareness'] += 20;
    }
    if (answers[11] === 'option-11B') {
        scores['sustainablePurchasing'] += 15;
        scores['attitude'] += 20;
    }
    if (answers[11] === 'option-11C') {
        scores['clothingCare'] += 20;
        scores['attitude'] += 15;
    }
    if (answers[11] === 'option-11D') {
        scores['sustainablePurchasing'] += 5;
        scores['environmentalAwareness'] += 10;
    }

    // Question 12 scoring
    if (answers[12] === 'option-12A') {
        scores['sustainablePurchasing'] += 25;
        scores['environmentalAwareness'] += 20;
    }
    if (answers[12] === 'option-12B') {
        scores['sustainablePurchasing'] += 15;
        scores['attitude'] += 20;
    }
    if (answers[12] === 'option-12C') {
        scores['clothingCare'] += 20;
        scores['attitude'] += 15;
    }
    if (answers[12] === 'option-12D') {
        scores['sustainablePurchasing'] += 5;
        scores['environmentalAwareness'] += 10;
    }

    // Question 13 scoring
    if (answers[13] === 'option-13A') {
        scores['sustainablePurchasing'] += 25;
        scores['environmentalAwareness'] += 20;
    }
    if (answers[13] === 'option-13B') {
        scores['sustainablePurchasing'] += 15;
        scores['attitude'] += 20;
    }
    if (answers[13] === 'option-13C') {
        scores['clothingCare'] += 20;
        scores['attitude'] += 15;
    }
    if (answers[13] === 'option-13D') {
        scores['sustainablePurchasing'] += 5;
        scores['environmentalAwareness'] += 10;
    }

    // Question 14 scoring
    if (answers[14] === 'option-14A') {
        scores['sustainablePurchasing'] += 25;
        scores['environmentalAwareness'] += 20;
    }
    if (answers[14] === 'option-14B') {
        scores['sustainablePurchasing'] += 15;
        scores['attitude'] += 20;
    }
    if (answers[14] === 'option-14C') {
        scores['clothingCare'] += 20;
        scores['attitude'] += 15;
    }
    if (answers[14] === 'option-14D') {
        scores['sustainablePurchasing'] += 5;
        scores['environmentalAwareness'] += 10;
    }

    return scores;
}


//PERSONALITY RESULT LOGIC
function determineResultType(categoryScores) {
    // Calculate average percentage across all categories
    const totalScore = Object.values(categoryScores).reduce((sum, score) => sum + score, 0);
    const averagePercentage = totalScore / 4; // 4 categories, max 50 points each = 200 total, so /4 gives percentage

    // Find the appropriate result type based on average percentage
    if (averagePercentage >= personalityResults['result1'].threshold) {
        return 'result1';
    } else if (averagePercentage >= personalityResults['result2'].threshold) {
        return 'result2';
    } else if (averagePercentage >= personalityResults['result3'].threshold) {
        return 'result3';
    } else {
        return 'result4'; // Default case for lowest score
    }
}


function generateCareCardContent(categoryScores, resultType) {
    // Find the lowest scoring category for personalized advice
    const lowestCategory = Object.keys(categoryScores).reduce((a, b) => 
        categoryScores[a] < categoryScores[b] ? a : b
    );

    const careCardContent = {
        'sustainablePurchasing': {
            header: 'purchase sustainably',
            description: 'Focus on buying fewer, higher-quality pieces made from natural or recycled materials. Research brands',
            resourceLink: 'https://www.thegoodtrade.com/features/fair-trade-clothing/'
        },
        'environmentalAwareness': {
            header: 'Expand thy environmental awareness',
            description: 'Learn about the fashion industry\'s impact on water usage, chemical pollution, and carbon emissions.',
            resourceLink: 'https://theflaw.org/articles/project-rapid-runway-unraveling-the-insidious-threads-of-fast-fashion/'
        },
        'clothingCare': {
            header: 'Clothing Care & Practices',
            description: 'Extend your clothes\' lifespan through proper washing and repair. Small changes in care can dramatically reduce your environmental impact.',
            resourceLink: 'https://www.pbs.org/newshour/science/laundry-is-a-top-source-of-microplastic-pollution-heres-how-to-clean-your-clothes-more-sustainably'
        },
        'attitude': {
            header: 'Climate Attitude',
            description: 'buy second-hand, participate in clothing swaps, or trying a capsule wardrobe approach.',
            resourceLink: 'https://vinatex.com/fast-fashion-fuels-mental-health-struggles-among-gen-z/'
        }
    };

    return careCardContent[lowestCategory];
}

// Dont like the percentage outcome, new function to calculate category scores out of 10
function convertScoresToOutOf10(categoryScores) {
    const scoresOutOf10 = {};
    
    Object.keys(categoryScores).forEach(key => {
        // Convert percentage (0-50) to scale of 10
        // Since max score per category is 50, divide by 5 to get out of 10
        scoresOutOf10[key] = Math.round(categoryScores[key] / 5);
        
        // Ensure score doesn't exceed 10
        if (scoresOutOf10[key] > 10) {
            scoresOutOf10[key] = 10;
        }
    });
    
    return scoresOutOf10;
}

// RESULT SCREEN - shows all categories, the card, the carecard.
function showResults() {
    // Hide current question and navigation
    document.getElementById(`question-${currentQuestion}`).classList.remove('active');
    document.getElementById('navigation').classList.remove('active');

    const categoryScores = calculateCategoryScores();
    const scoresOutOf10 = convertScoresToOutOf10(categoryScores);
    const resultType = determineResultType(categoryScores);
    const result = personalityResults[resultType];
    const careCard = generateCareCardContent(categoryScores, resultType);

    const resultHTML = `
        <div class="result-header">
            <h2 class="result-section-title">Your Result</h2>
            <div class="result-image-container">
                <div class="result-character-image">${result.image}</div>
            </div>
            <h3 class="result-character-title">${result.title}</h3>
            <p class="result-character-description">${result.description}</p>
            <p class="result-character-quote">${result.quote}</p>
        </div>

        <div class="category-scores-section">
            <div class="category-row">
                ${Object.keys(categories).map(key => 
                    `<div class="category-item">
                        <div class="category-image">${categories[key].image ? `<img src="${categories[key].image}" alt="${categories[key].name}" />` : (categories[key].icon || '')} </div>
                        <div class="category-title">${categories[key].name}</div>
                        <div class="category-score">${scoresOutOf10[key]}/10</div>
                        <div class="category-description">${categories[key].description}</div>
                    </div>`
                ).join('')}
            </div>
        </div>

        <div class="care-card-section">
            <h2 class="care-card-title">Your Care Card</h2>
            <h3 class="care-card-header">${careCard.header}</h3>
            <p class="care-card-description">${careCard.description}</p>
            <a href="${careCard.resourceLink}" target="_blank" class="care-card-resource-link">
                Learn More →
            </a>
        </div>
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

    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
    });
    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'inline-block';
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