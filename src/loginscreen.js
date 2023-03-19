function loginScreen () {
    const content = document.getElementById("content");
    const loginContent = document.createElement("div");
    loginContent.setAttribute("id", "loginContent");
    content.appendChild(loginContent);

    const form = document.createElement("form");
    const username = document.createElement("input");
    loginContent.appendChild(form);
    form.appendChild(username);
    username.placeholder = "Username";

    const login = document.createElement("button");
    login.innerHTML = "Login";
    loginContent.appendChild(login);

    login.addEventListener("click", function(){
        console.log(username.value);
        content.removeChild(loginContent);
        
    })

}

export {loginScreen};