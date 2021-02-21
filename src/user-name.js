const un = document.querySelector(".user-name");
const input = un.querySelector("input");
const greeting = un.querySelector("span");
let USERNAME_LS = [];

function loadUser () {
    USERNAME_LS = localStorage.USERNAME;
    if (USERNAME_LS === undefined) {
        input.classList.add("appear");
        input.classList.remove("disappear");
        greeting.classList.add("disappear");
        greeting.classList.remove("appear");
    } else {
        input.classList.add("disappear");
        input.classList.remove("appear");
        greeting.classList.add("appear");
        greeting.classList.remove("disappear");
        greeting.innerText = `Hello, ${USERNAME_LS}!`;
    }
}
function makeUserName () {
    input.setAttribute('placeholder','What is your name?');
    un.addEventListener("submit", handleSubmit);
}
function handleSubmit (e) {
    e.preventDefault();
    localStorage.setItem('USERNAME',input.value);
    loadUser();
}


function init () {
    loadUser();
    makeUserName();
}
init();