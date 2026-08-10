// =========================================
// CAREVORA AI
// Mock Interview
// =========================================

// =============================
// Interview Questions
// =============================

const questions = [

{
question:"Tell me about yourself.",
score:10
},

{
question:"Why should we hire you?",
score:10
},

{
question:"What are your strengths?",
score:10
},

{
question:"What are your weaknesses?",
score:10
},

{
question:"What is HTML?",
score:10
},

{
question:"Difference between HTML and CSS?",
score:10
},

{
question:"What is JavaScript?",
score:10
},

{
question:"Explain Node.js.",
score:10
},

{
question:"What is Express.js?",
score:10
},

{
question:"What is MongoDB?",
score:10
}

];

// =============================
// Get Elements
// =============================

const questionText=document.getElementById("questionText");

const questionNumber=document.getElementById("questionNumber");

const answer=document.getElementById("answer");

const nextBtn=document.getElementById("nextBtn");

const finishBtn=document.getElementById("finishBtn");

const answered=document.getElementById("answered");

const currentScore=document.getElementById("currentScore");

const confidence=document.getElementById("confidence");

const grammar=document.getElementById("grammar");

const communication=document.getElementById("communication");

const finalScore=document.getElementById("finalScore");

const finalConfidence=document.getElementById("finalConfidence");

const finalCommunication=document.getElementById("finalCommunication");

const finalGrammar=document.getElementById("finalGrammar");

const feedbackText=document.getElementById("feedbackText");

const resultSection=document.querySelector(".result-section");

// =============================
// Variables
// =============================

let currentQuestion=0;

let score=0;

let totalAnswered=0;
let studentName = "";
let studentBranch = "";
let interviewType = "";
let interviewDifficulty = "";

// Hide Result Initially

resultSection.style.display="none";
document.querySelector(".question-section").style.display = "none";

// First Question

loadQuestion();

// =============================
// Load Question
// =============================

function loadQuestion(){

questionNumber.innerText=currentQuestion+1;

questionText.innerText=questions[currentQuestion].question;

answer.value="";

}
// =============================
// Start Interview
// =============================

const interviewForm = document.getElementById("interviewForm");

interviewForm.addEventListener("submit", function (e) {

    e.preventDefault();

    studentName = document.getElementById("name").value.trim();

    studentBranch = document.getElementById("branch").value;

    interviewType = document.getElementById("type").value;

    interviewDifficulty = document.getElementById("difficulty").value;

    document.querySelector(".interview-form").style.display = "none";

    document.querySelector(".question-section").style.display = "block";

});
// =============================
// Next Question
// =============================

nextBtn.addEventListener("click", () => {

    if (answer.value.trim() === "") {

        alert("Please answer the question.");

        return;

    }

    totalAnswered++;

    answered.innerText = totalAnswered;

    // Random AI Score

    let randomScore = Math.floor(Math.random() * 11) + 90;

    score += randomScore;

    currentScore.innerText = Math.round(score / totalAnswered) + "%";

    confidence.innerText = (85 + Math.floor(Math.random() * 15)) + "%";

    grammar.innerText = (88 + Math.floor(Math.random() * 12)) + "%";

    communication.innerText = (84 + Math.floor(Math.random() * 16)) + "%";

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    }

    else {

        finishInterview();

    }

});

// =============================
// Finish Button
// =============================

finishBtn.addEventListener("click", () => {

    if (totalAnswered === 0) {

        alert("Please answer at least one question.");

        return;

    }

    finishInterview();

});


   

// =========================================
// Timer
// =========================================

let timeLeft = 60;

const timer = document.getElementById("time");

let countdown = setInterval(updateTimer,1000);

function updateTimer(){

timeLeft--;

timer.innerText=timeLeft;

if(timeLeft<=0){

clearInterval(countdown);

autoNext();

}

}

// =========================================
// Auto Next Question
// =========================================

function autoNext(){

if(currentQuestion<questions.length-1){

nextBtn.click();

resetTimer();

}

else{

finishInterview();

}

}

// =========================================
// Reset Timer
// =========================================

function resetTimer(){

clearInterval(countdown);

timeLeft=60;

timer.innerText=timeLeft;

countdown=setInterval(updateTimer,1000);

}

// =========================================
// Download Report
// =========================================

const downloadBtn=document.getElementById("downloadReport");

downloadBtn.addEventListener("click",()=>{

let report=`

==============================

CAREVORA AI

MOCK INTERVIEW REPORT

==============================

Questions Answered : ${totalAnswered}

Overall Score : ${finalScore.innerText}

Confidence : ${finalConfidence.innerText}

Communication : ${finalCommunication.innerText}

Grammar : ${finalGrammar.innerText}

Feedback :

${feedbackText.innerText}

Generated By CAREVORA AI

`;

const blob=new Blob([report],{type:"text/plain"});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="Interview_Report.txt";

a.click();

URL.revokeObjectURL(url);

});

// =========================================
// Restart Timer After Next Question
// =========================================

nextBtn.addEventListener("click",()=>{

resetTimer();

});

// =========================================
// Finish Timer
// =========================================

function finishInterview(){

clearInterval(countdown);

document.querySelector(".question-section").style.display="none";

resultSection.style.display="block";

let final=Math.round(score/totalAnswered);

finalScore.innerText=final+"%";

finalConfidence.innerText=(85+Math.floor(Math.random()*15))+"%";

finalCommunication.innerText=(84+Math.floor(Math.random()*16))+"%";

finalGrammar.innerText=(88+Math.floor(Math.random()*12))+"%";

if(final>=90){

feedbackText.innerText="Excellent Performance! You are placement ready.";

}

else if(final>=75){

feedbackText.innerText="Good Performance! Improve technical concepts and confidence.";

}

else{

feedbackText.innerText="Keep practicing regularly. Your communication and technical knowledge need improvement.";

}
saveInterview();
}
async function saveInterview() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/interview/save", {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                "Authorization": `Bearer ${token}`

            },

            body: JSON.stringify({
name: studentName,

branch: studentBranch,

interviewType: interviewType,

difficulty: interviewDifficulty,
                questionsAnswered: totalAnswered,

                score: parseInt(finalScore.innerText),

                confidence: parseInt(finalConfidence.innerText),

                communication: parseInt(finalCommunication.innerText),

                grammar: parseInt(finalGrammar.innerText),

                feedback: feedbackText.innerText

            })

        });

        const data = await response.json();

        console.log("Interview API Response:", data);

    }

    catch (error) {

        console.error("Interview Save Error:", error);

    }

}