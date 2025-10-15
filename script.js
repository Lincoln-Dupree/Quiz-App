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

// this is a click event to fetch the JSON data, and then store it locally for later use in updating HTML
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
const allChoices = document.querySelectorAll(".choice-option");
let score = 0;

//functionality for the actual quiz section
window.addEventListener("DOMContentLoaded", function () {
    if (document.body.classList.contains("page-game")) {
        let questionNumInt = Number(questionNum.innerText);
        quizTitleIcon.src = selectData.icon;
        quizTitleText.innerText = selectData.title;
        questionText.innerText = selectData.questions[0].question;
        choiceAText.innerText = selectData.questions[0].options[0];
        choiceBText.innerText = selectData.questions[0].options[1];
        choiceCText.innerText = selectData.questions[0].options[2];
        choiceDText.innerText = selectData.questions[0].options[3];

        for (const choice of allChoices) {
            choice.addEventListener("click", function () {
                // clear format on each click
                for (const each of allChoices) {
                    each.classList.remove("correct-choice");
                    each.classList.remove("wrong-choice");
                }

                const selectedText = this.querySelector(".choice-text").innerText;
                // base zero issue fix
                let numIntMath = Number(questionNumInt) - 1;
                const correctAnswer = selectData.questions[`${numIntMath}`].answer;

                console.log(selectedText);
                console.log(correctAnswer);

                if (selectedText == correctAnswer) {
                    choice.classList.add("correct-choice");
                } else {
                    choice.classList.add("wrong-choice");
                }
            })
        }

        submitAnswer.addEventListener("click", function () {
            // updates the score, and then clears the format
            for (const each of allChoices) {
                if (each.classList.contains("correct-choice")) {
                    score += 1;
                }
                each.classList.remove("correct-choice");
                each.classList.remove("wrong-choice");
            }

            console.log(score);

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

const resultsTitleIcon = document.querySelector(".results-title-icon");
const resultsTitleText = document.querySelector(".results-title-text");

//functionality for the results page
window.addEventListener("DOMContentLoaded", function () {
    if (document.body.classList.contains("page-results")) {
        quizTitleIcon.src = selectData.icon;
        quizTitleText.innerText = selectData.title;
        resultsTitleIcon.src = selectData.icon;
        resultsTitleText.innerText = selectData.title;
    }
});


