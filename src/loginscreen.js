const username = document.createElement("input");


function loginScreen () {
    const content = document.getElementById("content");
    const loginContent = document.createElement("div");
    loginContent.setAttribute("id", "loginContent");
    content.appendChild(loginContent);

    const form = document.createElement("form");
    loginContent.appendChild(form);
    form.appendChild(username);
    username.placeholder = "Username";
    let yourName = username.value;

    const loginButton = document.createElement("button");
    loginButton.textContent = "Login";
    loginContent.appendChild(loginButton);

    loginButton.addEventListener("click", function(){

        content.removeChild(loginContent);
        getPreviousMessages();
        messagePage();

    })

    async function getPreviousMessages(){
        for (let i = 0; i < 8; i++) {
         const message = await fetch("https://chat.avalon.build/chat")
         .then((response) => response.json());
     
         const listMessages = await message[i];

         const messageContent = document.getElementById("message-content");
         const author = document.createElement("div");
         const previousMessage = document.createElement("div");
         author.setAttribute("id", "author");
         previousMessage.setAttribute("id", "previousMessage");
         messageContent.appendChild(author);
         messageContent.appendChild(previousMessage);
         author.innerHTML = listMessages.author;
         previousMessage.innerHTML = listMessages.message;

         if (listMessages.author === username.value){author.innerHTML = "you said..."};
     
     /*
         Object.keys(listMessages)
         .forEach (function eachKey(key){
            const trial = (`${key}: ${listMessages[key]}`);
            const author = trial.author;
         });
     */
     }
     }
     
}

function messagePage(){ 
    const messageBox = document.createElement("input");
    messageBox.placeholder = "Enter message here";
    content.appendChild(messageBox);

    const refreshButton = document.createElement("button");
    refreshButton.textContent = "Refresh";
    content.appendChild(refreshButton);
    refreshButton.addEventListener("click", function(){
        messageBox.value = "";
    });

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    content.appendChild(submitButton);

    submitButton.addEventListener("click",function(){
        const messageContent = document.getElementById("message-content");
        const messageContainer = document.createElement("div");
        const yourMessage = document.createElement("div");
        messageContainer.setAttribute("id", "messageContainer");
        yourMessage.setAttribute("id", "yourMessage");
        messageContent.appendChild(messageContainer);
        messageContainer.appendChild(yourMessage);
        yourMessage.innerHTML += messageBox.value;
        postMessage();
    })

    async function postMessage(){
        const response = await fetch ("https://chat.avalon.build/chat", {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: username.value,
                message: messageBox.value
            })
        })
        }
    
}


export {loginScreen, messagePage, username};