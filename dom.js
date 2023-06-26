import { TodoListItem } from "./class.js"



export function createElement(tagName, attributes = {}) { //a comprendre ...
    const element = document.createElement(tagName)
    for (const [attribute, value] of Object.entries(attributes)) {
        if (value !== false && value !==null) {
            element.setAttribute(attribute, value)
        }
    }
    return element
}

export function onSubmit (e) {
    e.preventDefault() //annule le comportement par défaut du submit
    const title = new FormData(e.currentTarget).get('title').toString()
    // console.log(title) //controle
    if (title === '') {
        return //si titre vide, stop
    }
    const todo = {
        id: Date.now(),
        title,
        completed: false
    }
    const item = new TodoListItem(todo)
    const list = document.querySelector('.list-group')
    console.log("🚀 ~ file: app.js:74 ~ TodoList ~ onSubmit ~ list:", list)
    item.prependTo(list)
    e.currentTarget.reset() //vide le champs du formulaire
}


export function toggleFilter (e) {
    e.preventDefault //s'habituer à faire ça pour  empecher comportement par défaut du bouton
    const filter = e.currentTarget.getAttribute('data-filter') //currentTaget : s'exercer avec, permet de récupérer ce que l'on veut d'un élément, ici l'attribut data-filter
    // console.log(filter) //test
    e.currentTarget.parentElement.querySelector('.active').classList.remove('active') //trouve dans l'élément parent le filtre qui a la class active et l'enlève
    // console.log(e.currentTarget.parentElement) //test
    e.currentTarget.classList.add('active')
    const list = document.querySelector('.list-group')
    if (filter === 'todo') {
        list.classList.add('hide-completed')
        list.classList.remove('hide-todo')
    } else if (filter === 'done') {
        list.classList.remove('hide-completed')
        list.classList.add('hide-todo')
    } else {
        list.classList.remove('hide-completed')
        list.classList.remove('hide-todo')    
    }
}