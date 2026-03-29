let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let isAnswered = false;

function startQuiz(questions) {
    currentQuestions = questions;
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    isAnswered = false;
    
    showQuestion();
}

function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    const questionText = document.getElementById('question-text');
    const questionImg = document.getElementById('question-img');
    const optionsContainer = document.getElementById('options-container');
    const confirmBtn = document.getElementById('confirm-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    
    // Update progress
    progressText.textContent = `السؤال ${currentQuestionIndex + 1} من ${currentQuestions.length}`;
    progressFill.style.width = `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%`;
    
    // Update question text and image
    questionText.textContent = question.question;
    questionImg.src = question.image || 'images/placeholder.jpg';
    
    // Clear and rebuild options
    optionsContainer.innerHTML = '';
    selectedAnswer = null;
    isAnswered = false;
    confirmBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    
    // Enable all options
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach(option => {
        option.style.pointerEvents = 'auto';
    });
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.innerHTML = `
            <input type="radio" id="option${index}" name="answer" value="${index}">
            <label for="option${index}">${option}</label>
        `;
        
        const radio = optionDiv.querySelector('input');
        radio.addEventListener('change', function() {
            if (!isAnswered) {
                selectedAnswer = parseInt(this.value);
                confirmBtn.style.display = 'block';
                
                // Remove previous selections
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                optionDiv.classList.add('selected');
            }
        });
        
        optionsContainer.appendChild(optionDiv);
    });
    
    confirmBtn.onclick = confirmAnswer;
    nextBtn.onclick = nextQuestion;
}

function confirmAnswer() {
    if (selectedAnswer === null) return;
    
    const question = currentQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    const confirmBtn = document.getElementById('confirm-btn');
    const nextBtn = document.getElementById('next-btn');
    
    isAnswered = true;
    
    // Disable all options
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Show correct/incorrect styling
    options.forEach((option, index) => {
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedAnswer && selectedAnswer !== question.correct) {
            option.classList.add('incorrect');
        }
    });
    
    // Update score
    if (selectedAnswer === question.correct) {
        score++;
    }
    
    // Hide confirm button and show next button
    confirmBtn.style.display = 'none';
    nextBtn.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const quizContent = document.getElementById('quiz-content');
    const resultContainer = document.getElementById('result-container');
    const scoreText = document.getElementById('score-text');
    const percentageText = document.getElementById('percentage-text');
    const messageText = document.getElementById('message-text');
    
    const percentage = Math.round((score / currentQuestions.length) * 100);
    
    scoreText.textContent = `لقد حصلت على ${score} من ${currentQuestions.length}`;
    percentageText.textContent = `${percentage}%`;
    
    let message = '';
    if (percentage >= 80) {
        message = 'ممتاز! أنت جاهز لامتحان القيادة';
    } else if (percentage >= 60) {
        message = 'جيد جداً! استمر بالممارسة';
    } else if (percentage >= 40) {
        message = 'مقبول. تحتاج للمزيد من الدراسة';
    } else {
        message = 'تحتاج للمزيد من الدراسة والممارسة';
    }
    
    messageText.textContent = message;
    
    quizContent.style.display = 'none';
    resultContainer.style.display = 'block';
}

function restartQuiz() {
    const quizContent = document.getElementById('quiz-content');
    const resultContainer = document.getElementById('result-container');
    
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    isAnswered = false;
    
    quizContent.style.display = 'block';
    resultContainer.style.display = 'none';
    
    showQuestion();
}
