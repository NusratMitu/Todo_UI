import { renderTodoList } from "../index.js";
import { todos } from "./deteleTask.js";
import { isUserInputValid } from "./utilities.js";

export const handleEdit = (taskId) => {
  const todoToEdit = todos.find((todo) => todo.id === taskId);
  todoToEdit.isEditing = true;
  renderTodoList();
};

export const handleCancel = (taskId) => {
  const todoToCancel = todos.find((todo) => todo.id === taskId);
  // if (task === undefined) {
  //   return;
  // }

  if (todoToCancel.error) {
    todoToCancel.isEditing = true;

    return;
  }

  todoToCancel.isEditing = false;
  renderTodoList();
};

export const handleUpdate = (taskId, updatedValue) => {
  const taskToUpdate = todos.find((todo) => todo.id === taskId);

  if (isUserInputValid(updatedValue)) {
    taskToUpdate.value = updatedValue;
    taskToUpdate.isEditing = false;
    taskToUpdate.error = "";
  } else {
    taskToUpdate.error = "Updated task can not be empty";
    taskToUpdate.value = "";
  }

  renderTodoList();
};
