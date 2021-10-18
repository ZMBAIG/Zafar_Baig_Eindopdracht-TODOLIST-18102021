const addEventListeners = () => {
  let addButton = document.querySelector(".add-btn");
  let listOfItem = document.querySelector(".item-list");
  let intputField = document.querySelector(".todolist-form");
  listOfItem.addEventListener("click", updateTask);
  intputField.addEventListener("submit", (event) => {
    event.preventDefault();
    addNewTask();
    return false;
  });
  addButton.addEventListener("click", addNewTask);
};

//========================adding task to DOM==================================//
const addNewTask = async () => {
  let newItemInput = document.querySelector(".todolist-input");
  if (newItemInput.value !== "") {
    const newTask = await postNewTask(newItemInput.value);
    addNewTaskToDom(newTask);
  } else {
    alert("Please enter text here!");
  }
  newItemInput.value = "";
};

const updateTask = async (event) => {
  let parent = event.target.parentElement;
  let id = parent.getAttribute("id");
  if (event.target.classList.contains("deleteBtn")) {
    let response = await postDeleteTask(id);
    if (response === 204) {
      parent.remove();
    }
  } else if (event.target.classList.contains("checkBoxBtn")) {
    let response = await postUpdateTaskStatus(
      id,
      event.target.getAttribute("checked") != "true"
    );
    loadAllTasks();
  } else if (event.target.classList.contains("editBtn")) {
    let taskDone =
      event.target.previousSibling.previousSibling.getAttribute("checked");
    if (taskDone == "false") {
      let taskText = event.target.previousSibling.textContent;
      let inputField = document.createElement("input");
      inputField.setAttribute("type", "text");
      inputField.classList.add("edittask-input");
      inputField.value = taskText;
      console.log(parent.children);
      event.target.previousSibling.remove();
      parent.insertBefore(inputField, parent.children[1]);
      inputField.addEventListener("click", saveUpdatedTask);
      inputField.addEventListener("keypress", saveUpdatedTask);
      inputField.addEventListener("focusout", loadAllTasks);
      document.querySelector(".edittask-input").focus();
      document
        .querySelector(".edittask-input")
        .setSelectionRange(taskText.length, taskText.length);
    }
  }
};

const saveUpdatedTask = (event) => {
  if (event.key == "Enter") {
    let id = event.target.parentElement.getAttribute("id");
    let updatedText = event.target.value;
    postUpdateTaskText(id, updatedText);
    loadAllTasks();
  }
};

//========================creating li, checkbox and delete trash icon============

const getTaskLi = (task) => {
  let taskLi = document.createElement("li");
  taskLi.classList.add("li-style");
  taskLi.setAttribute("id", task._id);
  let taskText = document.createTextNode(task.description);
  if (task.done == true) {
    taskLi.style.textDecoration = "line-through";
  } else {
    taskLi.style.textDecoration = "none";
  }
  let checkBox = getCheckBox(task.done);
  let taskImg = getDeletBtn();
  let editImg = getEditImg();

  taskLi.appendChild(checkBox);
  taskLi.appendChild(taskText);
  taskLi.appendChild(editImg);
  taskLi.appendChild(taskImg);
  return taskLi;
};

const getEditImg = () => {
  let editImg = document.createElement("i");
  editImg.classList.add("fas");
  editImg.classList.add("editBtn");
  return editImg;
};

const getDeletBtn = () => {
  let taskImg = document.createElement("i");
  taskImg.classList.add("far");
  taskImg.classList.add("fa-trash-alt");
  taskImg.classList.add("deleteBtn");
  return taskImg;
};

const getCheckBox = (checked) => {
  let checkBox = document.createElement("i");
  checkBox.classList.add("checkBoxBtn");
  checkBox.setAttribute("checked", checked);
  if (checked == true) {
    checkBox.classList.add("fas");
    checkBox.classList.add("fa-check");
    checkBox.classList.remove("far");
    checkBox.classList.remove("fa-square");
  } else {
    checkBox.classList.remove("fas");
    checkBox.classList.remove("fa-check");
    checkBox.classList.add("far");
    checkBox.classList.add("fa-square");
  }
  return checkBox;
};

//========================editing and creating new tasks============================

const addNewTaskToDom = (newTask) => {
  let listOfItem = document.querySelector(".item-list");
  let taskLi = getTaskLi(newTask);
  listOfItem.appendChild(taskLi);
};

const loadAllTasks = async () => {
  let tasks = await postGetAllTasks();
  let todoUl = document.querySelector(".item-list");
  todoUl.querySelectorAll("*").forEach((element) => element.remove());
  tasks.forEach((element) => {
    addNewTaskToDom(element);
  });
};

const app = () => {
  addEventListeners();
  loadAllTasks();
};

app();
