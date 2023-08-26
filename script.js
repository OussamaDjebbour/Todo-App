"use strict";

const form = document.querySelector("form");
const input = document.querySelector("#text");
const parentTodo = document.querySelector(".parent-todo");
const itemNumber = document.querySelector("#item-number");
// const todos = document.querySelectorAll(".container-todo");
const all = document.querySelectorAll("#all");

let itemNbr = 0;

const addNewTodo = function () {
  const inputValue = input.value;
  const html = ` 
          <div class="container-todo">
              <span class="inp"></span>
              <img id="cross" src="images/icon-cross.svg" alt="" />
          </div>
     `;

  parentTodo.insertAdjacentHTML("afterbegin", html);
  const TodoText = document.querySelector(".inp");
  TodoText.textContent = inputValue;
  input.value = "";
  itemNbr += 1;
  itemNumber.textContent = itemNbr;
};

const removeTodo = function (e) {
  const targetCross = e.target;
  const cross = e.target.closest(".container-todo").querySelector("#cross");
  const box = e.target.closest(".container-todo");
  const boxAfter = window.getComputedStyle(box, "::after");

  console.log(boxAfter);

  if (!(targetCross === cross)) return;

  targetCross.closest(".container-todo").remove();
  itemNbr -= 1;
  itemNumber.textContent = itemNbr;
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addNewTodo();
});

parentTodo.addEventListener("click", function (e) {
  e.preventDefault();
  removeTodo(e);
});
