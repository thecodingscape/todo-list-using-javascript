const todoApp = document.querySelector(".todo-app");
const todoInput = document.querySelector(".todo-app-input");
const todoBtn = document.querySelector(".todo-app-btn");
const todoList = document.querySelector(".todo-app-list");

//Click Event Listener

todoBtn.addEventListener("click", addTodoList);
todoList.addEventListener("click", TodoAction);

document.addEventListener("DOMContentLoaded", getTodosLocal);


// Function to adding Todo List

function addTodoList(event) {


    //adding div under todo-app-list


    const todoNewDiv = document.createElement("div");
    todoNewDiv.classList.add("todo-app-item-list");

    const todoNewInput = document.createElement("span");
    todoNewInput.innerHTML = '<i class="bi bi-app"></i>';
    todoNewDiv.appendChild(todoNewInput);

    const todoNewP = document.createElement("p");
    todoNewP.innerHTML = todoInput.value;
    todoNewDiv.appendChild(todoNewP);
    saveTodoLocal(todoInput.value);

    const todoNewAction = document.createElement("span");
    todoNewAction.innerHTML = '<i class="bi bi-trash3-fill close"></i>';
    todoNewDiv.appendChild(todoNewAction);



    todoList.appendChild(todoNewDiv);
    todoInput.value = "";
}

// Adding Todo Action

function TodoAction(e) {
    //console.log(e.target);
    const todoItem = e.target;
    //console.log(todoItem.classList[1]);

    //Task completed

    if (todoItem.classList[1] === "bi-app") {
        todoItem.classList.toggle('bi-check2-square');
        const todoComplete = todoItem.parentElement;
        const todoCompleted = todoComplete.parentElement;
        todoCompleted.classList.toggle('completed');
    }

    // Deleting Todo Task

    if (todoItem.classList[2] === "close") {
        const todoDeleteElement = todoItem.parentElement;
        const todoDeleteElementTask = todoDeleteElement.parentElement;
        //console.log(todoDeleteElementTask);

        todoDeleteElementTask.remove();
        deleteTodosLocal(todoDeleteElementTask);


    }
}

// save todo task items in the Browser local storage we use localstorage function using javascript

function saveTodoLocal(todoItem) {
    let todo;
    if (localStorage.getItem('todo') === null) {
        todo = [];
    }
    else {
        todo = JSON.parse(localStorage.getItem('todo'));

    }

    todo.push(todoItem);
    localStorage.setItem("todo", JSON.stringify(todo));
}

// retrieve todo items from local storage

function getTodosLocal(todoItem) {
    let todo;
    if (localStorage.getItem('todo') === null) {
        todo = [];
    }
    else {
        todo = JSON.parse(localStorage.getItem('todo'));
    }

    todo.forEach(function (todo) {
        const todoNewDiv = document.createElement("div");
        todoNewDiv.classList.add("todo-app-item-list");

        const todoNewInput = document.createElement("span");
        todoNewInput.innerHTML = '<i class="bi bi-app"></i>';
        todoNewDiv.appendChild(todoNewInput);

        const todoNewP = document.createElement("p");
        todoNewP.innerHTML = todo; // get values from local storage
        todoNewDiv.appendChild(todoNewP);


        const todoNewAction = document.createElement("span");
        todoNewAction.innerHTML = '<i class="bi bi-trash3-fill close"></i>';
        todoNewDiv.appendChild(todoNewAction);



        todoList.appendChild(todoNewDiv);
    });
}

//Delete Todo Item from Local Storage

function deleteTodosLocal(todoDelete) {
    let todo;
    if (localStorage.getItem('todo') === null) {
        todo = [];
    }
    else {
        todo = JSON.parse(localStorage.getItem('todo'));
    }


    //console.log(todoDelete.children[1].innerHTML);

    const todoDeleteIndex = todoDelete.children[1].innerHTML;
    todo.splice(todo.indexOf(todoDeleteIndex), 1);

    localStorage.setItem('todo', JSON.stringify(todo));
}

