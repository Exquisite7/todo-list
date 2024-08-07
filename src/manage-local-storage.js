import { displayToDo } from "./dom.js";

export function saveToDoToLocal(toDo, checkList) {
    let toDoArray = JSON.parse(localStorage.getItem('toDoArray')) || [];
    toDo.CheckList = checkList;
    toDoArray.push(toDo);
    localStorage.setItem('toDoArray', JSON.stringify(toDoArray));
}