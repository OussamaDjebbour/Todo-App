"use strict";

const form = document.querySelector("form");
const input = document.querySelector("#text");
const parentTodo = document.querySelector(".parent-todo");
const itemNumber = document.querySelector("#item-number");
const controlTodo = document.querySelector(".control-todo-container");
const allTodosButton = document.querySelector("#all");
const activeTodosButton = document.querySelector("#active");
const completedTodosButton = document.querySelector("#completed");
const deletecompletedTodosButton = document.querySelector(".clear-completed");

let itemNbr = 0;
let todosAllArray = [];

const increaseItemsNbr = function () {
  itemNbr += 1;
  itemNumber.textContent = itemNbr;
};

const dereaseItemsNbr = function () {
  itemNbr -= 1;
  itemNumber.textContent = itemNbr;
};

const addNewTodo = function () {
  const inputValue = input.value;
  const html = ` 
          <div class="container-todo">
              <div>
                <label >
                <input type="checkbox" name="btn-check" id="btn-check"  />
                <span class="check"></span>
                </label>
                <span class="inp"></span>
              </div>
              <img id="cross" src="images/icon-cross.svg" alt="" />
          </div>
     `;

  if (inputValue === "") return;

  parentTodo.insertAdjacentHTML("afterbegin", html);

  const containerTodo = document.querySelector(".container-todo");
  const TodoText = document.querySelector(".inp");

  TodoText.textContent = inputValue;
  input.value = "";

  increaseItemsNbr();
  todosAllArray.push(containerTodo);
};

const removeTodo = function (e) {
  const targetCross = e.target;
  const cross = e.target.closest(".container-todo").querySelector("#cross");

  if (!(targetCross === cross)) return;

  targetCross.closest(".container-todo").remove();
  dereaseItemsNbr();
};

const changeTextDecorAndColor = function (target, decor, color) {
  target.style.textDecoration = `${decor}`;
  target.style.color = `${color}`;
};

const todoCompleted = function (e) {
  const targetTextInput = e.target
    .closest(".container-todo")
    .querySelector(".inp");

  const checkBox = e.target
    .closest(".container-todo")
    .querySelector("#btn-check");

  if (checkBox.checked && e.target === checkBox) {
    changeTextDecorAndColor(
      targetTextInput,
      "line-through",
      "hsl(233, 14%, 35%)"
    );
    dereaseItemsNbr();
  }
  if (!checkBox.checked && e.target === checkBox) {
    changeTextDecorAndColor(targetTextInput, "none", "hsl(234, 39%, 85%)");
    increaseItemsNbr();
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addNewTodo();
});

parentTodo.addEventListener("click", function (e) {
  removeTodo(e);
  todoCompleted(e);
});

const showAllTodos = function () {
  todosAllArray.forEach((el) => {
    el.classList.remove("hidden");
  });
};

const hideTodos = function (array) {
  array.forEach((el) => {
    el.classList.add("hidden");
  });
};

controlTodo.addEventListener("click", function (e) {
  let todosActiveArray = todosAllArray.filter(
    (el) => !el.querySelector("#btn-check").checked
  );
  let todosCompletedArray = todosAllArray.filter(
    (el) => el.querySelector("#btn-check").checked
  );

  if (e.target === activeTodosButton) {
    showAllTodos();
    hideTodos(todosCompletedArray);
  }
  if (e.target === completedTodosButton) {
    showAllTodos();
    hideTodos(todosActiveArray);
  }
  if (e.target === allTodosButton) {
    showAllTodos();
  }
  if (e.target === deletecompletedTodosButton) {
    todosCompletedArray.forEach((el) => {
      el.remove();
    });
  }
});
