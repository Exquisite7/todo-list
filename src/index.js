import { createToDo } from "./create-to-do";
import { projectLoad } from "./project";
import {
  displayDefaultProject,
  displayTheForm,
  addItemToCheckList,
  clearForm,
  displayToDo,
  hideForm,
} from "./dom";
import "./style.css";

// Call project on first land
projectLoad();

// Call DOM Manipulation module to control UI
//dom();

// Call displayToDo on first land - pulls from web local storage API (if any)
displayToDo();

// Click events module
let clickEventsModule = (function () {
  // Click event for displaying the form
  const addNewToDo = document.querySelector(".add-todo-button");
  addNewToDo.addEventListener("click", displayTheForm);

  // Click event for adding an item to the checklist on the form
  const addToChecklist = document.querySelector(".add-to-checklist");
  addToChecklist.addEventListener("click", addItemToCheckList);

  // Click event to clear the form
  const clearButton = document.querySelector(".reset-button");
  clearButton.addEventListener("click", clearForm);

  // Click event to submit a new todo form to project
  const submitButton = document.querySelector(".submit-button");
  submitButton.addEventListener("click", createToDo);

  // Click event to cancel the form and hide it

  const cancelButton = document.querySelector(".cancel-button");
  cancelButton.addEventListener("click", hideForm);
})();

document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("checkbox");

  // Set the initial theme based on the checkbox state
  if (checkbox.checked) {
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
  }

  // Event listener for when the dark mode toggle changes
  checkbox.addEventListener("change", () => {
    document.body.classList.toggle("light");
  });
});


// Call to-do.js module file and apply some objects/properties which will eventually be replaced by UI input

//const myToDo = createToDo("Grocery Run", "Go get groceries", "8/3/2024", "Low", "Meat, Eggs, Milk");
//const myToDo2 = createToDo("Homework", "Do Odin Project Work", "8/6/2024", "Medium", "Read Module, Do ToDo Project");
//console.log("Show me properties on myToDo from index.js....", myToDo);
//console.log("Show me properties on myToDo2 from index.js....", myToDo2);
