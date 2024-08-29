import { compareAsc, format, parseISO, startOfToday } from "date-fns";
import { clearForm, displayToDo } from "./dom";
import { saveToDoToLocal } from "./manage-local-storage";

// Creating an array for ToDo, if needed down the road...
let toDoArray = [];

document.addEventListener("DOMContentLoaded", () => {
  const createToDoButton = document.getElementById("submit-button");
  createToDoButton.addEventListener("click", createToDo);
  displayToDo();
});

// Factory function to create todo list
export const createToDo = () => {
  let Title = document.getElementById("Title").value.trim();
  let Description = document.getElementById("Description").value.trim();
  let DueDate = document.getElementById("DueDate").value;
  let Priority = document.getElementById("Priority").value;

  // Check to see if empty fields exists
  if (!Title || !Description || !DueDate) {
    alert(
      "Title, Description, and Due Date are required fields, please try again!",
    );
    return;
  }

  // Check to see if a pre-date was entered
  if (parseISO(DueDate) < startOfToday()) {
    alert(
      "You have entered a date that has already passed! Please enter a date greater than or equal to today!",
    );
    console.log("due date", parseISO(DueDate));
    console.log("date now", startOfToday());
    return;
  }

  // Loop over the nodelist for Check List items from the DOM and format to string
  const nodeListCheckList = document.querySelectorAll(".form-li");
  let _CheckListArray = [];

  for (let i = 0; i < nodeListCheckList.length; i++) {
    // Strip off the "x" from the end of each li then push to temp array
    let strippedCheckList = nodeListCheckList[i].textContent.replace(
      "\u00D7",
      "",
    );
    _CheckListArray.push(strippedCheckList);
  }

  // Strip off the checklist array and convert to string with commas
  if (_CheckListArray.length == 0) {
    alert("CheckList cannot be empty");
    return;
  }

  let CheckList = _CheckListArray.join(", ");

  console.log("Called createToDo module...creating todo now");
  console.log({ Title, Description, DueDate, Priority, CheckList });
  console.log("Pushing this object to the toDoArray....");
  // TODO: remove below two lines of code if array is not needed
  toDoArray.push({ Title, Description, DueDate, Priority, CheckList });

  // Call storage module and push object to local storage
  saveToDoToLocal({ Title, Description, DueDate, Priority }, CheckList);

  // Reset the form after successful submission
  clearForm();

  displayToDo();

  return { Title, Description, DueDate, Priority, CheckList };
};
