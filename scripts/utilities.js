import { taskInputText, errorMessage } from "./elements.js";

export const isUserInputValid = (textContent) => {
  return textContent.trim() !== "";
};

export const validateInput = () => {
  if (isUserInputValid(taskInputText.value)) {
    errorMessage.innerHTML = "";

    return true;
  }

  errorMessage.innerHTML = "Please add a task";
  errorMessage.classList.add("errorText");
  return false;
};
