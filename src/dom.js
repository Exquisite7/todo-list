import { projectLoad } from "./project";

//DOM manipulation to display the UI components
export function displayDefaultProject() {
  //DOM for the default project load
  const projectsInfoDiv = document.createElement("div");
  projectsInfoDiv.textContent = projectLoad().projectTitle;
  contentDiv.appendChild(projectsInfoDiv);
}

export function displayTheForm() {
  document.getElementById("add-todo-form").style.display = "";
}

export function addItemToCheckList() {
  const addItem = document.getElementById("add-to-checklist").value;

  if (addItem !== "") {
    const ul = document.querySelector(".todo-ul");
    const li = document.createElement("li");
    li.className = "form-li";
    li.textContent = addItem;
    const span = document.createElement("span");
    span.className = "remove-checklist-item";
    const removeIcon = document.createTextNode("\u00D7");
    li.appendChild(span);
    span.appendChild(removeIcon);
    ul.appendChild(li);
    document.getElementById("add-to-checklist").value = "";

    // DOM check for existing check list items already present
    if (document.querySelectorAll(".form-li").length > 0) {
      console.log(
        "INSIDE MODULE IF....",
        document.querySelectorAll(".form-li").length,
      );
      const nodeListCheckList = document.querySelectorAll(".form-li");
      console.log(nodeListCheckList);

      // DOM to bind click event to each node in nodelist and remove node if clicked
      nodeListCheckList.forEach((checkListItem) => {
        checkListItem.addEventListener(
          "click",
          function removeItemFromChecklist() {
            checkListItem.remove();
          },
        );
      });
    }
  } else return;
}

export function clearForm() {
  const nodeListCheckList = document.querySelectorAll(".form-li");
  for (let i = 0; i < nodeListCheckList.length; i++) {
    nodeListCheckList[i].remove();
  }
  document.getElementById("add-todo").reset();
}

export function hideForm() {
  clearForm();
  document.getElementById("add-todo-form").style.display = "none";
}

export function displayToDo() {
  // Retrieve ToDos from localStorage
  const storedToDos = JSON.parse(localStorage.getItem("toDoArray")) || [];

  // Check to ensure local storage is present to load, otherwise gracefully return out - avoid app crash
  if (storedToDos.length === 0) {
    return;
  }

  // Check and clear current display DOM, if any
  const projects = document.querySelector(".projects");
  projects.innerHTML = "";

  // Display each ToDo
  storedToDos.forEach((toDo, index) => {
    const { Title, Description, DueDate, Priority, CheckList } = toDo;

    // Create the display card for the display DOM
    console.log("Display to screen");
    const card = document.createElement("div");
    card.classList.add("card");
    projects.appendChild(card);

    // Place data in local temp array and loop over key/value pairs and display to DOM
    let _displayArray = { Title, Description, DueDate, Priority };
    console.log(_displayArray);

    for (let key in _displayArray) {
      console.log(`${key}: ${_displayArray[key]}`);
      const para = document.createElement("p");
      para.textContent = `${key}: ${_displayArray[key]}`;
      card.appendChild(para);
    }

    // DOM for checklist items to present to right side display area
    const CheckListLabel = document.createElement("p");
    CheckListLabel.textContent = "Tasks:";
    const ul = document.createElement("ul");
    CheckListLabel.classList.add("check-list-label");
    card.appendChild(CheckListLabel);
    card.appendChild(ul);

    console.log(
      "Show me the contents of checklist from local storage...",
      CheckList,
    );
    let _checkListArray = CheckList.split(",");
    console.log("ERRROR", _checkListArray);

    if (CheckList !== "") {
      // Loop through temp checklistarray to create an li and display to DOM for each
      for (let i = 0; i < _checkListArray.length; i++) {
        console.log(_checkListArray[i]);
        const li = document.createElement("li");
        li.className = "display-li";
        li.textContent = _checkListArray[i];

        // Add listener onto each li and toggle CSS class to strike through text on display
        li.addEventListener("click", function strikeOutCheckListItem() {
          li.classList.toggle("done");
          localStorage.setItem(li.textContent, li.classList.contains("done"));
        });

        ul.appendChild(li);
      }
    }

    // Create delete todo card button/event listener to remove card from display
    const deleteToDoButton = document.createElement("button");
    deleteToDoButton.classList.add("remove-todo-button");
    deleteToDoButton.textContent = "Delete/Complete ToDo";
    card.appendChild(deleteToDoButton);
    deleteToDoButton.addEventListener("click", function deleteToDo() {
      card.remove();
      const updatedToDoArray = storedToDos.filter((_, i) => i !== index);
      localStorage.setItem("toDoArray", JSON.stringify(updatedToDoArray));
    });
  });

  // Call on page refresh to check for existing strike throughs
  window.onload = function () {
    // Loop through current display li's on DOM and assign strike through CSS if local storage API flag is set
    const liNodes = document.querySelectorAll(".display-li");
    liNodes.forEach((liNode) => {
      if (localStorage.getItem(liNode.textContent) == "true") {
        console.log("Inside the onload if.....");
        liNode.className = "done";
      }
    });
  };
}
