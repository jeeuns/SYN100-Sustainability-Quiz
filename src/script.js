let currentQuestion = 0;
let answers = {};
let questionSubmitted = {};

const totalQuestions = 14; //dont forget to update when making more questions

const questionsWithSubmit = [7, 13, 14]; // Add more if needed

const correctAnswers = {
    7: 'option-7A',
    13: 'option-13C',
    14: 'option-14B',
    // add more correct-answer questions here
};

// Personality results - add in images later
const personalityResults = {
    'result1': {
    image: 'assets/Elephant.png',
    title: 'Eco-Warrior Elephant',
    description: 'The elephant represents those who carry a big heart for the planet and the people on it. They symbolize wisdom, advocacy, and balance, knowing that true sustainability means caring for both the environment and our own well-being. Elephants remind us that speaking up for fair fashion and mindful living can inspire others, but that we don\'t need to shoulder the entire burden alone.',
    quote: '"Speaking up for people, the planet, and fair fashion."',
    threshold: 80 //80% average score
    },
    'result2': {
    image: 'assets/thriftytiger.png',
    title: 'Thrifty Tiger',
    description: 'Tiger is the bold shopper who seeks treasures responsibly. They represent smart, sustainable buying habits and fiercely believe that thrifting is a way to play a part in helping their environment.',
    quote: '“Wild about second-hand!”',
    threshold: 60 //60-79% average score
    },
    'result3': {
    image: 'assets/sustainablesloth.png',
    title: 'Sustainable Sloth',
    description: 'Sloth is all about slowing down, re-wearing, and taking good care of what they already own. They symbolize patience, perseverance, and know that caring for their clothes is caring for the planet.',
    quote: '“Longer-lasting clothing is the most sustainable clothing!”',
    threshold: 40 //40-59% average score
    },
    'result4': {
    image: 'assets/polyesterpenguin.png',
    title: 'Polyester Penguin',
    description: 'Penguin represents people who love trends and convenience but are starting to realize they may need to shift their habits. They are evolving into a greener wardrobe and turning awareness into action.',
    quote: '“Even if you\'ve been swimming in fast fashion, you can always change direction!”',
    threshold: 0 //0-39% average score
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

function startQuiz() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('question-1').classList.add('active');
    document.getElementById('navigation').classList.add('active');
    currentQuestion = 1;
}

function selectOption(element) {
    const questionContainer = element.closest('.quiz-screen');
    const questionNumber = currentQuestion;
    
    // If this is a submit question and it's already been submitted correctly, don't allow changes
    if (questionsWithSubmit.includes(questionNumber) && 
        questionSubmitted[questionNumber] && 
        answers[questionNumber] === correctAnswers[questionNumber]) {
        return;
    }
    
    // Clear any previous feedback for submit questions
    if (questionsWithSubmit.includes(questionNumber)) {
        const allOptions = questionContainer.querySelectorAll('.option');
        allOptions.forEach(opt => {
            opt.classList.remove('incorrect', 'disabled');
        });
    }
    
    const options = questionContainer.querySelectorAll('.option');
    
    // Unselect all options in the current question
    options.forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');

    answers[questionNumber] = element.getAttribute('data-value');

    // Reset submission state when a new option is selected for submit questions
    if (questionsWithSubmit.includes(currentQuestion)) {
        questionSubmitted[currentQuestion] = false;
    }

    updateNavigationButtons();
}

function submitAnswer() {
    const currentContainer = document.getElementById(`question-${currentQuestion}`);
    const selectedOption = currentContainer.querySelector('.option.selected');

    if (!selectedOption) return;

    const correct = correctAnswers[currentQuestion];
    const selectedValue = selectedOption.getAttribute('data-value');
    const isLastQuestion = currentQuestion === totalQuestions;

    questionSubmitted[currentQuestion] = true;

    if (selectedValue !== correct) {
        // Incorrect answer - show feedback
        selectedOption.classList.add('incorrect');
        updateNavigationButtons();
    } else {
        // Correct answer
        if (isLastQuestion) {
            // For last question with correct answer, go straight to results
            showResults();
            return; // Exit early to prevent any further processing
        } else {
            // For non-final questions, automatically move to next question
            setTimeout(() => {
                nextQuestion();
            }, );
        }
    }

    //UPDATE: this caused the user to clikc submit then next, instead of just moving to the next question.

    // // Hide Submit, show Next after feedback
    // document.getElementById('submitBtn').style.display = 'none';
    // document.getElementById('nextBtn').style.display = 'inline-block';
    // document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        document.getElementById(`question-${currentQuestion}`).classList.remove('active');
        currentQuestion++;
        
        const nextQuestionEl = document.getElementById(`question-${currentQuestion}`);
        nextQuestionEl.classList.add('active');

        // Update button states
        updateNavigationButtons();

        if (currentQuestion === totalQuestions) {
            document.getElementById('nextBtn').textContent = 'Get Results';
            document.getElementById('nextBtn').onclick = showResults;
        } else {
            document.getElementById('nextBtn').textContent = 'Next';
            document.getElementById('nextBtn').onclick = nextQuestion;
        }
    }
}

function previousQuestion() {
    if (currentQuestion > 1) {
        document.getElementById(`question-${currentQuestion}`).classList.remove('active');
        currentQuestion--;
        document.getElementById(`question-${currentQuestion}`).classList.add('active');
        
        // Clear any feedback states when going back
        clearQuestionState(currentQuestion);

        updateNavigationButtons();
        
        document.getElementById('nextBtn').textContent = 'Next';
        document.getElementById('nextBtn').onclick = nextQuestion;
    }
}

function updateNavigationButtons() {
    const isSubmitQuestion = questionsWithSubmit.includes(currentQuestion);
    const hasAnswer = answers[currentQuestion];
    const isSubmitted = questionSubmitted[currentQuestion];
    const hasCorrectAnswer = hasAnswer && answers[currentQuestion] === correctAnswers[currentQuestion];
    const isLastQuestion = currentQuestion === totalQuestions;
    
    // Show/hide previous button
    document.getElementById('prevBtn').style.display = currentQuestion > 1 ? 'inline-block' : 'none';
    
    if (isSubmitQuestion) {
        if (!hasAnswer) {
            // No answer selected yet
            document.getElementById('submitBtn').style.display = 'none';
            document.getElementById('nextBtn').style.display = 'inline-block';
            document.getElementById('nextBtn').disabled = true;
            document.getElementById('nextBtn').textContent = isLastQuestion ? 'Get Results' : 'Next';
            document.getElementById('nextBtn').onclick = isLastQuestion ? showResults : nextQuestion;
        } else if (!isSubmitted) {
            // Answer selected but not submitted
            document.getElementById('submitBtn').style.display = 'inline-block';
            document.getElementById('nextBtn').style.display = 'none';
        } else if (isSubmitted && hasCorrectAnswer) {
            // Correct answer submitted - this should only happen for non-last questions
            // because last question goes directly to results
            document.getElementById('submitBtn').style.display = 'none';
            document.getElementById('nextBtn').style.display = 'inline-block';
            document.getElementById('nextBtn').disabled = false;
            document.getElementById('nextBtn').textContent = 'Next';
            document.getElementById('nextBtn').onclick = nextQuestion;
        } else {
            // Incorrect answer submitted - show submit button for retry
            document.getElementById('submitBtn').style.display = 'inline-block';
            document.getElementById('nextBtn').style.display = 'none';
        }
    } else {
        // Regular question (no submit required)
        document.getElementById('submitBtn').style.display = 'none';
        document.getElementById('nextBtn').style.display = 'inline-block';
        document.getElementById('nextBtn').disabled = !hasAnswer;
        if (isLastQuestion) {
            document.getElementById('nextBtn').textContent = 'Get Results';
            document.getElementById('nextBtn').onclick = showResults;
        } else {
            document.getElementById('nextBtn').textContent = 'Next';
            document.getElementById('nextBtn').onclick = nextQuestion;
        }
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
        scores['sustainablePurchasing'] += 10;
        scores['attitude'] += 5;
    }
    if (answers[1] === 'option-1B') {
        scores['sustainablePurchasing'] += 20;
        scores['attitude'] += 10;
    }
    if (answers[1] === 'option-1C') {
        scores['sustainablePurchasing'] += 30;
        scores['attitude'] += 15;
    }

    // Question 2 scoring
    if (answers[2] === 'option-2A') {
        scores['attitude'] += 5;
        scores['environmentalAwareness'] += 15;
    }
    if (answers[2] === 'option-2B') {
        scores['environmentalAwareness'] += 10;
        scores['attitude'] += 10;
    }
    if (answers[2] === 'option-2C') {
        scores['attitude'] += 15;
        scores['environmentalAwareness'] += 5;
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
        scores['sustainablePurchasing'] += 10;
        scores['environmentalAwareness'] += 10;
    }
    if (answers[4] === 'option-4B') {
        scores['sustainablePurchasing'] += 30;
        scores['environmentalAwareness'] += 30;
    }
    if (answers[4] === 'option-4C') {
        scores['sustainablePurchasing'] += 10;
        scores['environmentalAwareness'] += 10;
    }
    if (answers[4] === 'option-4D') {
        scores['sustainablePurchasing'] += 20;
        scores['environmentalAwareness'] += 20;
    }

    // Question 5 scoring
    if (answers[5] === 'option-5A') {
        scores['sustainablePurchasing'] += 10;
        scores['environmentalAwareness'] += 10;
    }
    if (answers[5] === 'option-5B') {
        scores['sustainablePurchasing'] += 20;
        scores['environmentalAwareness'] += 20;
    }
    if (answers[5] === 'option-5C') {
        scores['sustainablePurchasing'] += 30;
        scores['environmentalAwareness'] += 30;
    }

    // Question 6 scoring
    if (answers[6] === 'option-6A') {
        scores['sustainablePurchasing'] += 30;
        scores['clothingCare'] += 30;
    }
    if (answers[6] === 'option-6B') {
        scores['sustainablePurchasing'] += 10;
        scores['clothingCare'] += 10;
    }
    if (answers[6] === 'option-6C') {
        scores['sustainablePurchasing'] += 20;
        scores['clothingCare'] += 20;
    }

    // Question 7 scoring
    // if (answers[7] === 'option-7A') {
    //     scores['sustainablePurchasing'] += 25;
    //     scores['environmentalAwareness'] += 20;
    // }
    // if (answers[7] === 'option-7B') {
    //     scores['sustainablePurchasing'] += 15;
    //     scores['attitude'] += 20;
    // }
    // if (answers[7] === 'option-7C') {
    //     scores['clothingCare'] += 20;
    //     scores['attitude'] += 15;
    // }
    // if (answers[7] === 'option-7D') {
    //     scores['sustainablePurchasing'] += 5;
    //     scores['environmentalAwareness'] += 10;
    // }

    // Question 8 scoring
    if (answers[8] === 'option-8A') {
        scores['sustainablePurchasing'] += 10;
        scores['environmentalAwareness'] += 10;
    }
    if (answers[8] === 'option-8B') {
        scores['sustainablePurchasing'] += 20;
        scores['environmentalAwareness'] += 20;
    }
    if (answers[8] === 'option-8C') {
        scores['sustainablePurchasing'] += 30;
        scores['environmentalAwareness'] += 30;
    }
    if (answers[8] === 'option-8D') {
        scores['sustainablePurchasing'] += 40;
        scores['environmentalAwareness'] += 40;
    }

    // Question 9 scoring
    if (answers[9] === 'option-9A') {
    //     scores['sustainablePurchasing'] += 25;
    //     scores['environmentalAwareness'] += 20;
    }
    if (answers[9] === 'option-9B') {
        scores['sustainablePurchasing'] += 20;
        scores['attitude'] += 20;
    }
    if (answers[9] === 'option-9C') {
        scores['sustainablePurchasing'] += 20;
        scores['attitude'] += 10;
    }

    // Question 10 scoring
    if (answers[10] === 'option-10A') {
        scores['sustainablePurchasing'] += 10;
        scores['attitude'] += 10;
    }
    if (answers[10] === 'option-10B') {
        scores['sustainablePurchasing'] += 30;
        scores['attitude'] += 30;
    }

    // Question 11 scoring
    if (answers[11] === 'option-11A') {
        scores['sustainablePurchasing'] += 30;
        scores['environmentalAwareness'] += 20;
    }
    if (answers[11] === 'option-11B') {
        scores['sustainablePurchasing'] += 20;
        scores['environmentalAwareness'] += 15;
    }
    if (answers[11] === 'option-11C') {
        scores['sustainablePurchasing'] += 10;
        scores['environmentalAwareness'] += 10;
    }
    if (answers[11] === 'option-11D') {
        scores['sustainablePurchasing'] += 5;
        scores['environmentalAwareness'] += 5;
    }

    // Question 12 scoring
    if (answers[12] === 'option-12A') {
        scores['sustainablePurchasing'] += 5;
        // scores['environmentalAwareness'] += 20;
    }
    if (answers[12] === 'option-12B') {
        scores['sustainablePurchasing'] += 20;
        // scores['attitude'] += 20;
    }
    if (answers[12] === 'option-12C') {
        scores['sustainablePurchasing'] += 10;
        // scores['attitude'] += 15;
    }
    if (answers[12] === 'option-12D') {
        scores['sustainablePurchasing'] += 10;
        // scores['environmentalAwareness'] += 10;
    }

    // Question 13 scoring
    // if (answers[13] === 'option-13A') {
    //     scores['sustainablePurchasing'] += 25;
    //     scores['environmentalAwareness'] += 20;
    // }
    // if (answers[13] === 'option-13B') {
    //     scores['sustainablePurchasing'] += 15;
    //     scores['attitude'] += 20;
    // }
    // if (answers[13] === 'option-13C') {
    //     scores['clothingCare'] += 20;
    //     scores['attitude'] += 15;
    // }
    // if (answers[13] === 'option-13D') {
    //     scores['sustainablePurchasing'] += 5;
    //     scores['environmentalAwareness'] += 10;
    // }

    // Question 14 scoring
    // if (answers[14] === 'option-14A') {
    //     scores['sustainablePurchasing'] += 25;
    //     scores['environmentalAwareness'] += 20;
    // }
    // if (answers[14] === 'option-14B') {
    //     scores['sustainablePurchasing'] += 15;
    //     scores['attitude'] += 20;
    // }
    // if (answers[14] === 'option-14C') {
    //     scores['clothingCare'] += 20;
    //     scores['attitude'] += 15;
    // }
    // if (answers[14] === 'option-14D') {
    //     scores['sustainablePurchasing'] += 5;
    //     scores['environmentalAwareness'] += 10;
    // }

    return scores;
}


function generateCareCardContent(categoryScores, resultType) {
    const scoresOutOf10 = convertScoresToOutOf10(categoryScores);
    
    // Find the lowest scoring category for personalized advice
    const lowestCategory = Object.keys(categoryScores).reduce((a, b) => 
        categoryScores[a] < categoryScores[b] ? a : b
    );

    const lowestScore = scoresOutOf10[lowestCategory];

    const careCardContent = {
        'sustainablePurchasing': {
            header: 'Sustainable Purchasing',
            description: `
                    <h4>Why Wear Sustainable Clothing?</h4>
                        <p>\tSustainable purchasing means making mindful decisions about the clothes we buy, where instead of chasing fast, cheap trends, it focuses on quality, durability, and ethical production. Opting for sustainable clothing helps cut down the drastic environmental costs of fast fashion.</p>
                        <p>\tIf you are new to sustainable fashion, the price tags may seem more expensive, but it is important to understand that these brands are not meant to be consumed like fast fashion and instead are built for longevity.</p>
            `,
            tip: 'Tips for Shopping Sustainably',
            bulletpoint: `
                    <ul>
                        <li>Always prioritize <strong>natural fabrics</strong> such as organic cotton, linen, or hemp, while also making sure to purchase high-quality garments that are built to last.</li>
                        <li>Take time and research manufacturing process of the brands you intend to buy from, where you are on the lookout for certain certifications like:</li>
                            <ul>
                                <li><strong>Fair Trade</strong>, which guarantees fair wages and safe working conditions.</li>
                                <li><strong>GOTS (Global Organic Textile Standard)</strong>, which verifies organic status of fabrics.</li>
                                <li><strong>OEKO-TEX</strong>, which certifies that textiles are free from harmful substances.</li>
                            </ul>
                        <li>Instead of buying new clothing, consider pre-owned apparel by exploring your local thrift store.</li>
                        <li>Do your part in supporting sustainable approaches that promote recycling and upcycling in the fashion industry.</li>
                    </ul>
            `,
            resourceLink: 'https://www.thegoodtrade.com/features/fair-trade-clothing/',
            image: 'image.png'
        },
        'clothingCare': {
            header: 'Sustainable Clothing Practices',
            description: `
                <h4>What Are Microfibers?</h4>
                    <p>\tMicrofibers are tiny plastic fragments that are released from synthetic textiles especially as they are worn and washed.</p>
                    <p>\tMicrofibers commonly enter wastewater streams during laundry activities and pollute the oceans, as most wastewater treatment plants lack the advanced filtration process required to remove microplastics.</p>
                    <p>\tWhile preference for natural textiles is an effective choice to help eliminate the presence of non-biodegradable MF's in the environment, certain laundry conditions and practices can help to reduce MF shedding.</p>
            `,
            tip: 'Tips to Reduce Microfiber Shedding When Doing Laundry',
            bulletpoint: `
                    <ul>
                        <li>Run <strong>full loads</strong> to reduce the amount of friction garments are exposed to.</li>
                        <li>Set laundry cycles to <strong>delicate</strong>. Low abrasion and low spin help reduce MF release.</li>
                        <li>Use <strong>cold water</strong> rather than hot water.</li>
                        <li>Use <strong>less detergent</strong> and opt for <strong>liquid detergents</strong> over powder detergents which contain insoluble, abrasive particles.</li>
                        <li><strong>Air-dry</strong> clothes rather than using the drying machine, as MF shedding occurs in the dryer as well.</li>
                    </ul>
            `,
            resourceLink: 'https://www.pbs.org/newshour/science/laundry-is-a-top-source-of-microplastic-pollution-heres-how-to-clean-your-clothes-more-sustainably',
            image: 'assets/ccimg.jpg'
        },
        'attitude': {
            header: 'Climate Attitude',
            description: `
                <h4>How Does Mental Health And Climate Awareness Relate to Fast Fashion?</h4>
                    <p>\tStudies have shown that people tend to have a bit of a distorted perception about things when it comes to fast fashion. Most consumers will perceive themselves as having more knowledge than they actually do on the subject, and most people have a general knowledge while lacking concise knowledge.</p>
                    <p>\tAdditionally, many consumers rely on retailers to educate them on the clothing materials and communicate ethical practices; however, in reality, retailers will not always do this honestly.</p>
                    <p>\tDue to fast fashion's negative impact on the environment and people in intense ways, such as pollution and labor exploitation, people tend to have strong negative feelings about it.</p>
                    <p>\tStudies have shown that sometimes strong feelings can lead to overwhelming and unhealthy coping mechanisms like denial and apathy. This is why it is important to take care of our own mental health so we can face these things in a way that is manageable for us and take action instead of shutting down.</p>
                    <p>\tDespite there actually being a lot of awareness around the topic of fast fashion, there are very low percentages of people actually participating in sustainable purchasing, <strong>only around 20%</strong>. This incongruence between attitude or awareness and actual action is likely due to a few factors, and mental health is definitely one of them.</p>
                    `,
            tip: 'How to Optimize Your Mental Health to be a Better Consumer',
            bulletpoint: `
                    <ul>
                        <li>Remember to take care of yourself and be kind; overwhelming guilt and self-criticism are unhelpful 100% of the time, and you will be more likely to make positive changes in your lifestyle that help the environment when you are kind to yourself.</li>
                        <li>Find ways to connect with nature and the people around you, and practice empathy. Our disconnect from nature not only negatively impacts our mental health personally, but also negatively impacts our ability to see the ways in which we rely on nature, and connecting with it will motivate us to help ourselves and the planet.</li>
                        <li>Practice empathy; the more we can feel emotionally connected to those who are suffering from climate change, without separating them from ourselves, the more we will be able to see how much we need change. Empathize with nature, too. If we can feel hurt for the planet and the way it is hurting, then maybe we can see how much we benefit from helping it.</li>
                        <li>Educate yourself when you can on how to make more sustainable clothing choices and how to make manageable changes in a way that is sensitive to your circumstances and mental health. Remember that companies won't always be honest or upfront about their practices.</li>
                    </ul>
            `,
            resourceLink: 'https://vinatex.com/fast-fashion-fuels-mental-health-struggles-among-gen-z/',
            image: 'image.png'
        },
        'environmentalawareness': {
            header: 'Environmental Awareness',
            description: `
                <p>\t<italic>Polyester (above) showed limited signs of degradation while lyocell, a wood-based material (right), showed full degradation under marine conditions (Royer et al., 2021).</italic></p>
                <h4>Plastic Pollution</h4>
                    <p>\tThe UN estimates that 19-23 million tons of plastic waste enter marine environments annually, owing to waste mismanagement and plastic overconsumption.
                    Relatedly, global fiber production is undergoing a dramatic shift towards synthetic textiles which account for 62% of the current market compared to less than 10% in the 1970s.
                    Whether in landfills or the ocean, fabrics like polyester and acrylic are enduring pollutants. </p>
                <h4>Are Natural Fibers Good?</h4>
                    <p>\tAlthough natural fibers are biodegradable, they are not inherently sustainable. Water waste and deforestation are assured consequences in the production of natural textiles. In fact, denim and cotton production require substantially more water than polyester production.</p>
                    <p>\t<italic>→ One cotton shirt requires approximately 3,000 liters of water to produce, and a pair of jeans requires almost 4,000 liters.</italic></p>
                    <p>\tAdditionally, be wary of greenwashing in the marketing of semi-synthetics, namely viscose. Viscose is derived from wood pulp and is biodegradable; however, its intensive production and chemical processing result in greater greenhouse gas emissions and the pollution of toxic chemicals compared to other biodegradable textiles.</p>
                    <p>\tThe overconsumption of any product draws its own set of environmental impacts. Overconsumption can best be challenged with consumer mindfulness which can be developed through the process of educating oneself.<strong>At your next purchase, try considering brand ethics, production processes, and the impact of materials on the environment.</strong></p>
            `,
            tip: '',
            bulletpoint: ``,
            resourceLink: 'https://theflaw.org/articles/project-rapid-runway-unraveling-the-insidious-threads-of-fast-fashion/',
            image: 'assets/EnvironmentalAwareness.png'
        }
    };

    return careCardContent[lowestCategory];
}

// UPDATED CONVERT SCORE FUNCTION!!
function convertScoresToOutOf10(categoryScores) {
    const maxPoints = {
        'sustainablePurchasing': 185,
        'environmentalAwareness': 155,
        'clothingCare': 60,
        'attitude': 105
    };
    
    const scoresOutOf10 = {};
    
    Object.keys(categoryScores).forEach(key => {
        scoresOutOf10[key] = Math.round((categoryScores[key] / maxPoints[key]) * 10);
        scoresOutOf10[key] = Math.max(0, Math.min(10, scoresOutOf10[key]));
    });
    
    return scoresOutOf10;
}

// UPDATED PERSONALITY RESULT LOGIC
function determineResultType(categoryScores) {
    const maxPoints = {
        'sustainablePurchasing': 185,
        'environmentalAwareness': 155,
        'clothingCare': 60,
        'attitude': 105
    };
    // Calculate percentage for each category
    const categoryPercentages = {};
    let totalPercentage = 0;
    
    Object.keys(categoryScores).forEach(key => {
        categoryPercentages[key] = (categoryScores[key] / maxPoints[key]) * 100;
        totalPercentage += categoryPercentages[key];
    });
    
    const averagePercentage = totalPercentage / 4;
    if (averagePercentage >= personalityResults['result1'].threshold) {
        return 'result1';
    } else if (averagePercentage >= personalityResults['result2'].threshold) {
        return 'result2';
    } else if (averagePercentage >= personalityResults['result3'].threshold) {
        return 'result3';
    } else {
        return 'result4';
    }
}

// RESULT SCREEN UPDATED
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
                <div class="result-character-image"><img src="${result.image}" alt="${result.title}"/></div>
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
            <div class="care-card-image">
                <img src="${careCard.image}" alt="${careCard.header}" />
            </div>
            <div class="care-card-description">${careCard.description}</div>
            <h4 class="care-card-tip">${careCard.tip}</h4>
            <div class="care-card-bulletpoint">${careCard.bulletpoint}</div>
            
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