const username = document.createElement("input");


function loginScreen () {
    const content = document.getElementById("content");
    const loginContent = document.createElement("div");
    loginContent.setAttribute("id", "loginContent");
    content.appendChild(loginContent);

    const form = document.createElement("form");
    // const username = document.createElement("input");
    loginContent.appendChild(form);
    form.appendChild(username);
    username.placeholder = "Username";
    let yourName = username.value;

    const loginButton = document.createElement("button");
    loginButton.textContent = "Login";
    loginContent.appendChild(loginButton);

    loginButton.addEventListener("click", function(){
        console.log(username.value);
        content.removeChild(loginContent);
        messagePage();
    })
    
}

function messagePage(){ 

    const refreshButton = document.createElement("button");
    refreshButton.textContent = "Refresh";
    content.appendChild(refreshButton);
    refreshButton.addEventListener("click", function(){
        messageBox.value = "";
    });

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    content.appendChild(submitButton);

    const previousMessage = document.createElement("div");
    content.appendChild(previousMessage);
    //previousMessage.textContent = "TEST";

    const messageBox = document.createElement("input");
    messageBox.placeholder = "Enter message here";
    content.appendChild(messageBox);

    submitButton.addEventListener("click",function(){
        const messageContent = document.getElementById("message-content");
        const yourMessage = document.createElement("div");
        yourMessage.setAttribute("id", "yourMessage");
        messageContent.appendChild(yourMessage);
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