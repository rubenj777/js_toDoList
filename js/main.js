"use strict";

// VARIABLES

// FONCTIONS
function displayForm() {
  document.querySelector("#task-form").classList.toggle("hide");
  document.querySelector("#task-form").reset();
}

function loadDatas() {
  let list = localStorage.getItem("toDoList");
  list = JSON.parse(list);
  if (list == null) list = [];
  return list;
}

function saveTask(event) {
  event.preventDefault();
  // objet qui contient et recup la valeur
  let task = new Object();
  task.lvl = document.querySelector("#lvl").value;
  task.name = document.querySelector("#name").value;
  task.description = document.querySelector("#description").value;
  let list = loadDatas();
  // ajoute l'objet dans un tableau
  list.push(task);
  let jsonlist = JSON.stringify(list);
  localStorage.setItem("toDoList", jsonlist);
  document.querySelector("#task-form").classList.toggle("hide");
  displayTasks();
}

function deleteTasks() {
  localStorage.clear();
  displayTasks();
}

function deleteTask() {}

function displayTasks() {
  let list = loadDatas();
  let html = "<ul>";
  list.forEach((task, index) => {
    html += `<li data-index="${index}">${task.name} - ${task.lvl}%</li>`;
  });
  html += "</ul>";
  document.querySelector("#todo").innerHTML = html;
  document
    .querySelectorAll("#todo ul li")
    .forEach((li) => li.addEventListener("click", taskDetails));
}

function taskDetails() {
  let form = document.querySelector("#task-form");
  let edit = document.querySelector("aside a");
  // stocker la valeur du data-index contenu dans la balise HTML sur laquelle on a cliqué dans une variable index
  let index = this.dataset.index;

  //récupérer la liste des tâches qui est dans le localStorage (on a une fonction pour ça !!)
  let list = loadDatas();

  //dans la liste, cibler la ligne contenant l'objet de la tâche à éditer (on met en lien le tableau et l'index)
  let task = list[index];

  // on cible le h3 dans le aside pour lui injecter le nom de la tâche et le niveau d'accomplissement
  document.querySelector(
    "#task-details h3"
  ).innerHTML = `${task.name} - réalisé à ${task.lvl}%`;

  // on cible le p dans le aside pour lui injecter la description de la tâche
  document.querySelector("#task-details p").innerHTML = task.description;

  //on ajoute un data-index sur le a dans le aside
  document.querySelector("#task-details a").dataset.index = index;

  //on cible le aside pour lui supprimer la classe hide
  document.querySelector("#task-details").classList.remove("hide");
  edit.addEventListener("click", function () {
    form.setAttribute("data-mode", "edit");
    form.classList.toggle("hide");
  });
}

function taskEdit() {
  let index = this.dataset.index;
  let list = loadDatas();
  let task = list[index];

  displayForm();

  document.querySelector("#name").value = task.name;
  document.querySelector("#lvl").value = task.lvl;
  document.querySelector("#description").value = description.lvl;

  document.querySelector("#task-form").dataset.mode = "edit";
}

// CODE PRINCIPAL
document.addEventListener("DOMContentLoaded", function () {
  displayTasks();
  document.querySelector("#add-task").addEventListener("click", displayForm);
  document.querySelector("#task-form").addEventListener("submit", saveTask);
  document.querySelector("#clear-todo").addEventListener("click", deleteTasks);
  document.querySelector("#todo ul li").addEventListener("click", taskDetails);
  document.querySelector("task-details a").addEventListener("click", taskEdit);
});

//gestionnaire event :
//si type button -> au click sur le button
//si type submit -> au submit du formulaire (=annuler l'action par défaut de l'event)
