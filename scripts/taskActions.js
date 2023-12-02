import { handleDelete } from "./deteleTask.js";
import { handleDone } from "./doneTask.js";
import { handleCancel, handleEdit, handleUpdate } from "./editUpdateTask.js";
import { isUserInputValid } from "./utilities.js";

const doneIconUrl = "../images/done.svg";
const editIconUrl = "../images/edit.svg";
const deleteIconUrl = "../images/delete.svg";

const today = new Date();
const getCurrentDateTime = () => {
  const date = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
  return date;
};



const createUpdateInput = (todoToEdit) => {
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = todoToEdit.value;

  return inputField;
};

const createButton = (content) => {
  const button = document.createElement("button");
  button.innerHTML = content;

  return button;
};

const createTaskActionButton = (iconUrl, clickHandler) => {
  // const button = document.createElement("button");
  const icon = document.createElement("img");
  icon.src = iconUrl;
  // button.appendChild(icon);
  document.body.appendChild(icon);

  // button.addEventListener("click", clickHandler);
  icon.addEventListener("click", clickHandler);

  return icon;
};

export const createTaskElement = (task) => {
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-container__task-item");
  const doneButton = createTaskActionButton(doneIconUrl, () => handleDone(task.id));
  doneButton.classList.add("task-item__button");

  const deleteButton = createTaskActionButton(deleteIconUrl, () => handleDelete(task.id));
  deleteButton.classList.add("task-item__button");

  const editButton = createTaskActionButton(editIconUrl, () => handleEdit(task.id));
  const buttonContainerElement = document.createElement("div");
  const buttonGroup = document.createElement("div");
  const spanElement = document.createElement("h2");
  spanElement.textContent = task.value;
  const timeElement = document.createElement("p");
  const createdDate = getCurrentDateTime();
  timeElement.textContent = `Created at ${createdDate}`;

  const inputField = createUpdateInput(task);
  const updateButton = createButton("Save");

  taskItem.appendChild(spanElement);
  taskItem.appendChild(timeElement);
  buttonGroup.classList.add("buttonGroup");
  buttonContainerElement.appendChild(buttonGroup);

  if (task.isEditing) {
    spanElement.classList.add("hide");
    timeElement.classList.add("hide");

    inputField.classList.add("task-item__edit-input");

    updateButton.addEventListener("click", () => handleUpdate(task.id, inputField.value));
    deleteButton.addEventListener("click", () => handleCancel(task.id));

    taskItem.appendChild(inputField);
    buttonGroup.appendChild(updateButton);
    editButton.classList.add("hide");

    if (isUserInputValid(task.error)) {
      appendErrorToTask(taskItem, task.error);
    }

    doneButton.addEventListener("click", () => handleCancel(task.id));
  } else {
    deleteButton.addEventListener("click", () => handleDelete(task.id));
  }

  timeElement.classList.add("task-item__created-time");
  editButton.classList.add("task-item__button");
  buttonContainerElement.classList.add("task-item__button-container");

  buttonGroup.appendChild(doneButton);

  if (!task.isEditing) {
    buttonGroup.appendChild(editButton);
  }

  buttonGroup.appendChild(deleteButton);

  if (task.isDone) {
    spanElement.classList.add("task-item__done");
    editButton.classList.add("hide");
    doneButton.classList.add("hide");

    const completionBadge = document.createElement("div");
    completionBadge.classList.add("task-item__completion-badge");
    completionBadge.textContent = "completed";
    buttonContainerElement.appendChild(completionBadge);
  }

  taskItem.appendChild(buttonContainerElement);

  return taskItem;
};

export const appendErrorToTask = (li, error) => {
  const updateError = document.createElement("p");
  updateError.classList.add("errorText");
  updateError.textContent = error;
  li.appendChild(updateError);
};

export const createFilterDropdown = () => {
  const filterContainer = document.querySelector(".task-container__filter");
  const filter = document.createElement("select");
  filter.id = "filter";

  const options = ["All", "Complete", "Incomplete"];

  options.map((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.toLowerCase();
    optionElement.textContent = option;
    filter.appendChild(optionElement);
  });

  filterContainer.appendChild(filter);
};

createFilterDropdown();
