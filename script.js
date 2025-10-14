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



        window.location.href = "game.html";
        console.log(quiz);
    })
}