import "./style.css";

import { loginScreen, messagePage, username } from "./loginscreen";
loginScreen();


//TEST - returns object
async function getPreviousMessages(){
    for (let i = 0; i < 20; i++) {
    const message = await fetch("https://chat.avalon.build/chat")
    .then((response) => response.json());
    //console.log(message[i]);
    const content = document.getElementById("content");
    content.innerHTML += message[i];
}
}

/*
const content = document.getElementById("content");
const test = document.createElement("input");
content.appendChild(test);
const testMessage = test.value;
const testButton = document.createElement("button");
testButton.textContent = "Test";
content.appendChild(testButton);


    const postMessage = async () => {
        console.log(username.value);
        const response = await fetch ("https://chat.avalon.build/chat", {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: username.value,
                message: test.value
            })
    })
    }

    testButton.addEventListener("click", postMessage);
    */