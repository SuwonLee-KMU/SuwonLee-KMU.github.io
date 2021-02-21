const todo = document.querySelector('.todo-list');
const todoForm = todo.querySelector('form');
const todoInput = todo.querySelector('input');
let todoList = [];

function loadTodos () {
    todoListFromLS = localStorage.getItem('TODO');
    if (todoListFromLS !== null) {
        const parsedToDos = JSON.parse(todoListFromLS);
        todoList = parsedToDos;
        genTodos();
    }
}
function genTodos () {
    myList = todo.querySelector('ul');
    myList.innerText = ''; // ← clear the ul element
    let len = [];
    todoList.forEach((v) => {
        const elem = document.createElement('li');
        elem.innerHTML= '<button class="checkBtn" status="off">⬜</button>'
         + `<span>${v}</span>`
         + '<button class="delBtn">❌</button>';
        myList.appendChild(elem);
        elem.querySelector('.delBtn').addEventListener('click', handleDelete);
        elem.querySelector('.checkBtn').addEventListener('click', handleCheck);
    });
    // find maximum width
    listElements = myList.querySelectorAll('li');
    for (let i=0;i<todoList.length;i++) {
        len[i] = Number(listElements[i].clientWidth);
    }
    const maximumVal = Math.max.apply(null, len);
    // Apply width for all elements
    listElements.forEach((v) => {
        v.querySelector('span').style.minWidth=`${maximumVal}px`;
    });
}

function handleSubmit (e) {
    e.preventDefault();
    todoList.push(todoInput.value);
    todoInput.value = "";
    genTodos();
    localStorage.setItem('TODO', JSON.stringify(todoList));
}
function handleDelete (e) {
    // Remove from the list
    let li = e.target.parentNode;
    let idx = 0;
    for (let i=1; (li=li.previousSibling); i++) {
        idx = i};
    const ul = todo.querySelector('ul');
    ul.removeChild(e.target.parentNode);
    // remove from the local storage
    todoList.splice(idx,1);
    localStorage.setItem('TODO', JSON.stringify(todoList));
}
function handleCheck (e) {
    if (e.target.status === "off") {
        e.target.innerText = '✅';
        e.target.status = "on";
        e.target.parentNode.querySelector('span').style.textDecoration="line-through";

    } else {
        e.target.innerText = '⬜';
        e.target.status = "off"
        e.target.parentNode.querySelector('span').style.textDecoration="none";
    }
}

function init () {
    myList = document.createElement('ul');
    myList.style.listStyle = 'none';
    todo.appendChild(myList);
    loadTodos();
    todoForm.addEventListener('submit',handleSubmit);
}   

init();