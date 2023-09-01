"use strict";

const form = document.querySelector("form");
const input = document.querySelector("#text");
const parentTodo = document.querySelector(".parent-todo");
const itemNumber = document.querySelectorAll("#item-number");
const controlTodo = document.querySelectorAll(".control-todo-container");
const allTodosButton = document.querySelector("#all");
const activeTodosButton = document.querySelector("#active");
const completedTodosButton = document.querySelector("#completed");
const container = document.querySelector(".container");
const icon = document.querySelector("#icon-sun");

let itemNbr = 0;
let todosAllArray = [];
const LightGrayishBlue = "hsl(233, 11%, 84%)";

//  Callback functions
const displayItemNbrs = function () {
  itemNumber.forEach((item) => (item.textContent = itemNbr));
};

const increaseItemsNbr = function () {
  itemNbr += 1;
  displayItemNbrs();
};

const dereaseItemsNbr = function () {
  itemNbr -= 1;
  displayItemNbrs();
};

const changeTextDecorAndColor = function (target, decor, color) {
  target.style.textDecoration = `${decor}`;
  target.style.color = `${color}`;
};

const addNewTodo = function () {
  const inputValue = input.value;
  const html = ` 
          <div class="container-todo ">
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

  if (icon.classList.contains("moon")) {
    containerTodo.classList.add("color-container-lodo-light");
    containerTodo.style.borderBottom = `1px solid ${LightGrayishBlue}`;
    changeTextDecorAndColor(TodoText, "none", "hsl(235, 19%, 35%)");
    containerTodo.querySelector(".check").classList.add("border-circle");
  }

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
  if (
    !targetCross.closest(".container-todo").querySelector("#btn-check").checked
  ) {
    dereaseItemsNbr();
  }
};

const updateClrDcrAndIncreaseNbr = function (e, color) {
  const targetTextInput = e.target
    .closest(".container-todo")
    .querySelector(".inp");
  changeTextDecorAndColor(targetTextInput, "none", `${color}`);
  increaseItemsNbr();
};

const updateClrDcrAndDecreaseNbr = function (e, color) {
  const targetTextInput = e.target
    .closest(".container-todo")
    .querySelector(".inp");
  changeTextDecorAndColor(targetTextInput, "line-through", `${color}`);
  dereaseItemsNbr();
};

const todoCompleted = function (e) {
  const checkBox = e.target
    .closest(".container-todo")
    .querySelector("#btn-check");

  if (
    checkBox.checked &&
    e.target === checkBox &&
    !icon.classList.contains("moon")
  ) {
    updateClrDcrAndDecreaseNbr(e, "hsl(233, 14%, 35%)");
  }
  if (
    checkBox.checked &&
    e.target === checkBox &&
    icon.classList.contains("moon")
  ) {
    updateClrDcrAndDecreaseNbr(e, LightGrayishBlue);
  }
  if (
    !checkBox.checked &&
    e.target === checkBox &&
    !icon.classList.contains("moon")
  ) {
    updateClrDcrAndIncreaseNbr(e, "hsl(234, 39%, 85%)");
  }
  if (
    !checkBox.checked &&
    e.target === checkBox &&
    icon.classList.contains("moon")
  ) {
    updateClrDcrAndIncreaseNbr(e, "hsl(235, 19%, 35%)");
  }
};

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

const changeStateTodo = function (e) {
  const deletecompletedTodosButton = e.target
    .closest(".control-todo-container")
    .querySelector(".clear-completed");

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
};

const chngColorTodoLightDark = function (color1, color2) {
  const targetTextInput = document.querySelectorAll(".inp");

  targetTextInput.forEach((el) => {
    const checkBox = el.closest(".container-todo").querySelector("#btn-check");
    const chngClrBorderCircle = el
      .closest(".container-todo")
      .querySelector(".check");
    if (checkBox.checked) {
      changeTextDecorAndColor(el, "line-through", `${color1}`);
    }
    if (!checkBox.checked) {
      changeTextDecorAndColor(el, "none", `${color2}`);
      chngClrBorderCircle.classList.toggle("border-circle");
    }
  });
};

const chngStateLightDarkMode = function (
  color,
  color1,
  color2,
  color3,
  color4
) {
  const clearCompletedBtns = document.querySelectorAll(".clear-completed");
  const colorFilterTodos = document.querySelector(".filter-todo");
  const containerInput = document.querySelector(".container-input");

  const chngContainerTodoMode = function () {
    const containerTodo = document.querySelectorAll(".container-todo");
    containerTodo.forEach((el) => {
      el.classList.toggle("color-container-lodo-light");
      el.style.borderBottom = `1px solid ${color}`;
    });
  };
  chngContainerTodoMode();
  const chngBckgroundInputAndColor = function () {
    const paragraph = document.querySelector("p");
    input.style.backgroundColor = `${color1}`;
    paragraph.style.color = `${color2}`;
  };
  chngBckgroundInputAndColor();

  colorFilterTodos.classList.toggle("color-filter-todos");
  containerInput.classList.toggle("color-container-lodo-light");
  controlTodo.forEach((el) => {
    el.classList.toggle("color-container-lodo-light");
    el.classList.toggle("color-Grayish-Blue");
  });
  clearCompletedBtns.forEach((el) => {
    el.classList.toggle("color-container-lodo-light");
    el.classList.toggle("color-Grayish-Blue");
  });

  chngColorTodoLightDark(`${color3}`, `${color4}`);
};

//    Events Listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  addNewTodo();
});

parentTodo.addEventListener("click", function (e) {
  removeTodo(e);
  todoCompleted(e);
});

controlTodo.forEach((el) => {
  el.addEventListener("click", function (e) {
    changeStateTodo(e);
  });
});

icon.addEventListener("click", function (e) {
  document.body.classList.toggle("img-light");

  if (e.target.classList.contains("moon")) {
    e.target.classList.remove("moon");
    chngStateLightDarkMode(
      "hsl(233, 14%, 35%)",
      "hsl(235, 24%, 19%)",
      "hsl(235, 19%, 35%)",
      "hsl(233, 14%, 35%)",
      "hsl(234, 39%, 85%)"
    );
  } else {
    e.target.classList.add("moon");
    chngStateLightDarkMode(
      LightGrayishBlue,
      "hsl(0, 0%, 98%)",
      "hsl(233, 11%, 84%)",
      LightGrayishBlue,
      "hsl(235, 19%, 35%)"
    );
  }
});
