import {
  addTaskButton,
  searchButton,
  searchInput,
  taskInputText,
  taskList,
  navbar,
  toggleButton,
} from "./scripts/elements.js";
import { handleCreateTodo } from "./scripts/addTask.js";
import { todos } from "./scripts/deteleTask.js";
import { createTaskElement } from "./scripts/taskActions.js";
import { validateInput } from "./scripts/utilities.js";
import { COMPLETE, INCOMPLETE } from "./const.js";

const removeElementsBeforeRender = () => {
  const elementsToKeep = [];
  for (let i = 0; i < taskList.children.length; i++) {
    if (taskList.children[i].id === "card1") {
      elementsToKeep.push(taskList.children[i]);
    }
  }

  taskList.innerHTML = "";
  elementsToKeep.map((element) => {
    taskList.appendChild(element);
  });
};
const renderFilteredTodoList = () => {
  const filter = document.getElementById("filter");
  const selectedType = filter.value;

  switch (selectedType) {
    case COMPLETE:
      renderTasksByStatus(true);

      break;
    case INCOMPLETE:
      renderTasksByStatus(false);

      break;
    default:
      renderTodoList();
  }
};

const renderTasksByStatus = (isDone) => {
  removeElementsBeforeRender();

  const filteredTodos = todos.filter((todo) => todo.isDone === isDone);

  filteredTodos.map((todo) => {
    const newTask = createTaskElement(todo);
    taskList.appendChild(newTask);
  });
};

const debounce = (handleSearch, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleSearch(...args);
    }, delay);
  };
};
const handleSearch = () => {
  removeElementsBeforeRender();

  const searchText = searchInput.value.toLowerCase().trim();
  const filteredTasks = todos.filter((task) =>
    task.value.toLowerCase().includes(searchText)
  );

  filteredTasks.map((task) => {
    const newTask = createTaskElement(task);
    taskList.appendChild(newTask);
  });
};

export const renderTodoList = () => {
  removeElementsBeforeRender();

  searchInput.value = "";
  filter.value = "all";

  todos.map((todo) => {
    const newTask = createTaskElement(todo);
    taskList.insertBefore(newTask, taskList.children[1]);
  });
};

const handleToggle = () => {
  let firstCard = document.getElementById("card1");
  firstCard.style.display =
    firstCard.style.display === "none" || firstCard.style.display === ""
      ? "block"
      : "none";
};

toggleButton.addEventListener("click", handleToggle);
addTaskButton.addEventListener("click", handleCreateTodo);
taskInputText.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleCreateTodo();
  }
});

taskInputText.addEventListener("input", validateInput);

searchButton.addEventListener("click", () => {
  navbar.classList.toggle("show-search-box");
});

searchInput.addEventListener("keyup", () => {
  const debouncedSearchData = debounce(handleSearch, 400);
  debouncedSearchData();
});

filter.addEventListener("change", renderFilteredTodoList);

renderTodoList();
