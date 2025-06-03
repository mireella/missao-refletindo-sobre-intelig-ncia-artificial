const quizData = [
    {
        question: "1. A Inteligência Artificial pode ajudar a combater mudanças climáticas?",
        options: ["Sim, com análise de dados ambientais", "Não, IA não tem impacto nesse tema"],
        correct: 0
    },
    {
        question: "2. A IA pode reproduzir preconceitos sociais?",
        options: ["Sim, se treinada com dados enviesados", "Não, IA é sempre neutra"],
        correct: 0
    },
    {
        question: "3. A automação com IA pode afetar empregos tradicionais?",
        options: ["Sim, pode substituir algumas funções humanas", "Não, a IA não afeta o mercado de trabalho"],
        correct: 0
    },
    {
        question: "4. A IA pode ser usada para proteger culturas indígenas?",
        options: ["Sim, preservando línguas e tradições via tecnologia", "Não, tecnologia não interfere em culturas"],
        correct: 0
    },
    {
        question: "5. É importante regular o uso de IA para evitar impactos ambientais e sociais negativos?",
        options: ["Sim, para garantir desenvolvimento sustentável", "Não, regulamentações limitam a inovação"],
        correct: 0
    }
];

let currentQuestion = 0;
let userAnswers = [];

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const resultEl = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');

function loadQuestion() {
    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;
    optionsEl.innerHTML = "";

    currentQuiz.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.classList.add('option');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'option';
        input.value = index;
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        optionsEl.appendChild(label);
    });
}

nextBtn.addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');

    if (!selectedOption) {
        alert('Por favor, selecione uma opção!');
        return;
    }

    userAnswers.push(parseInt(selectedOption.value));

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById('quiz-container').classList.add('hidden');
    resultContainer.classList.remove('hidden');

    let score = userAnswers.filter((ans, index) => ans === quizData[index].correct).length;

    let summary = "";

    if (score === 5) {
        summary = "Excelente! Você entende bem os impactos sociais, culturais e ambientais da IA.";
    } else if (score >= 3) {
        summary = "Muito bom! Mas ainda pode aprofundar seus conhecimentos sobre os impactos da IA.";
    } else {
        summary = "Você precisa aprender mais sobre como a IA influencia questões sociais, culturais e ambientais.";
    }

    resultEl.textContent = `${summary} Você acertou ${score} de ${quizData.length} perguntas.`;
}

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    userAnswers = [];
    resultContainer.classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    loadQuestion();
});

loadQuestion();

