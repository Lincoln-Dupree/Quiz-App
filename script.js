"use strict";

const quizSelectBtn = document.querySelectorAll(".topic-btn");

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

