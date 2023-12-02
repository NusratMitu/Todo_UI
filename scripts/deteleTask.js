import { renderTodoList } from "../index.js";

export let todos = [];

export const handleDelete = (taskId) => {
  todos = todos.filter((todo) => todo.id !== taskId);
  renderTodoList();
};
