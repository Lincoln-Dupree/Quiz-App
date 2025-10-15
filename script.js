"use strict";

async function getData() {
    try {
        const response = await fetch("./data/data.json")

        if (!response.ok) {
            throw new Error("Could not fetch resource")
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error)
    }
}

const quizSelectBtn = document.querySelectorAll(".topic-btn");

for (const btn of quizSelectBtn) {

    btn.addEventListener("click", async function () {

        const topicText = btn.querySelector(".topic-text").innerText;
        const data = await getData();
        const quizzes = data.quizzes;

        const quiz = [];
        for (const topic of quizzes) {
            if (topic.title === topicText) {
                quiz.push(topic);
            }
        }

        localStorage.setItem("quizData", JSON.stringify(quiz));
        window.location.href = "game.html";
    })
}

const quizData = JSON.parse(localStorage.getItem("quizData"));
const selectData = quizData[0];
const quizTitleIcon = document.querySelector(".quiz-title-icon");
const quizTitleText = document.querySelector(".quiz-title-text");
const questionText = document.querySelector(".question-text");
const choiceAText = document.querySelector(".choice-a-text");
const choiceBText = document.querySelector(".choice-b-text");
const choiceCText = document.querySelector(".choice-c-text");
const choiceDText = document.querySelector(".choice-d-text");
const submitAnswer = document.querySelector(".submit-btn");
const questionNum = document.querySelector(".question-number");
let score = 0;

window.addEventListener("DOMContentLoaded", function () {
    if (document.body.classList.contains("page-game")) {
        quizTitleIcon.src = selectData.icon;
        quizTitleText.innerText = selectData.title;
        questionText.innerText = selectData.questions[0].question;
        choiceAText.innerText = selectData.questions[0].options[0];
        choiceBText.innerText = selectData.questions[0].options[1];
        choiceCText.innerText = selectData.questions[0].options[2];
        choiceDText.innerText = selectData.questions[0].options[3];

        submitAnswer.addEventListener("click", function () {
            let questionNumInt = Number(questionNum.innerText);
            questionText.innerText = selectData.questions[`${questionNumInt}`].question;
            choiceAText.innerText = selectData.questions[`${questionNumInt}`].options[0];
            choiceBText.innerText = selectData.questions[`${questionNumInt}`].options[1];
            choiceCText.innerText = selectData.questions[`${questionNumInt}`].options[2];
            choiceDText.innerText = selectData.questions[`${questionNumInt}`].options[3];

            if (questionNumInt < selectData.questions.length) {
                questionNumInt += 1;
                questionNum.innerText = questionNumInt.toString();
            }

            if (questionNumInt >= selectData.questions.length) {
                window.location.href = "results.html";
            }

        })
    }
});

window.addEventListener("DOMContentLoaded", function () {
    if (document.body.classList.contains("page-results")) {
        quizTitleIcon.src = selectData.icon;
        quizTitleText.innerText = selectData.title;
    }
});


