import { fetchJSON } from "./api.js"
import { TodoListItem } from "./class.js"
import { createElement, onSubmit, toggleFilter } from "./dom.js"


//INITIALISATION : on met dans la liste les données de l'API
const todos = await fetchJSON() //on met les éléments de la todoList dans une constante todos qui est un objet à 5 éléments
console.log(todos) //controle
const list = document.querySelector('.list-group')
// console.log(list)
for (let todo of todos) {
    const t = new TodoListItem(todo)
    // console.log(t) //controle
    t.appendTo(list)
}

//comportement bouton Ajouter
document.querySelector('form').addEventListener('submit', e => onSubmit(e))

// comportement filtres Toutes / A faire / Faites
document.querySelectorAll('.btn-group button').forEach(button => {
    button.addEventListener('click', e => toggleFilter(e))
})