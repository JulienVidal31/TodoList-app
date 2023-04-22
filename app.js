import { fetchJSON } from "./api.js"
import { createElement } from "./dom.js"


// 1) Récupération des éléments de base sur une api JSON--------------------------------------------------------------------------------------------------------
const todos = await fetchJSON() //on met les éléments de la todoList dans une constante todos qui est un objet à 5 éléments
console.log(todos) //controle


class TodoList {
    // todos

    constructor (todos) {
        this.todos = todos
    }

    appendTo (element) {
        element.innerHTML = `
        <form class="d-flex pb-4">
            <input required="" class="form-control" type="text" placeholder="Acheter des patates..." name="title" data-com.bitwarden.browser.user-edited="yes">
            <button class="btn-primary">Ajouter</button>
        </form>
        <main>
            <div class="btn-group mb-4" role="group">
                <button type="button" class=" btn btn-outline-primary active" data-filter="all">Toutes</button>
                <button type="button" class=" btn btn-outline-primary" data-filter="todo">A faire</button>
                <button type="button" class=" btn btn-outline-primary" data-filter="done">Faites</button>
            </div>
            <ul class="list-group">

            </ul>
        </main>
        `
        const list = element.querySelector('.list-group')
        for (let todo of this.todos) {
            const t = new TodoListItem(todo)
            // console.log(t) //controle
            t.appendTo(list)
        }
        element.querySelector('form').addEventListener('submit', e => this.onSubmit(e))
    }

    onSubmit (e) {
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

}

class TodoListItem {

    #element //creation propriété privée

    constructor (todo) {
        const li = createElement('li', {class: 'todo list-group-item d-flex align-items-center'})
        // console.log(li) //controle

        const checkbox = createElement('input', {
            class: 'form-check-input',
            type: 'checkbox',
            id: `todo-${todo.id}`,
            checked: todo.completed
        })
        
        const label = createElement('label', {
            class: 'ms-2 form-check-label',
            for: `todo-${todo.id}`
        })
        label.innerText = todo.title
        
        const button = createElement('button', {
            class: 'ms-auto btn btn-danger btn-sm'
        })
        button.innerHTML = '<i class="bi-trash"></i>'
        
        li.append(checkbox)
        li.append(label)
        li.append(button)

        button.addEventListener('click', () =>  this.remove()) //suppression d'un todo
        checkbox.addEventListener('change', e => this.toggle(e.currentTarget))



        this.#element = li
        // console.log(this.#element)
    }

    appendTo (element) {
        element.append(this.#element)
    }

    prependTo (element) {
        element.prepend(this.#element)
    }

    remove () {
        this.#element.remove()
    }

    toggle (checkbox) { //change l'état a faire / fait de la tache
        if (checkbox.checkbox) {
            this.#element.classList.add('is-completed')
        }else {
            this.#element.classList.remove('is-completed')
        }
    }

}

// const test = new TodoListItem(todos[0])
// console.log(todos[0])
// console.log(test)

const list = new TodoList(todos) //on créé la todoList grace à la classe TodoList
list.appendTo(document.querySelector("#todolist")) //on ajoute la todoList à l'élément sélectionné











// 2)  -------------------------------------------------------------------------------------------------------------------------------




// document.querySelector(".btn btn-primary").addEventListener('click', () => addTask())
// document.querySelector(".btn-primary").addEventListener('click', () => console.log("test"))

// function addTask () {
//     console.log("test")
// }

