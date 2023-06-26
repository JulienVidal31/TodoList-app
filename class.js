import { createElement } from "./dom.js"

export class TodoListItem {

    #element //creation propriété privée

    constructor (todo) {
        const li = createElement('li', {class: 'todo list-group-item d-flex align-items-center'})
        // console.log(li) //controle

        this.#element = li //initialisation de l'élément
        // console.log(this.#element)

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
        this.toggle(checkbox) //ajout la class is-completed si élément déjà coché à l'initialisation grace à la méthode toggle (1 tache est concernée)

        button.addEventListener('click', () =>  this.remove()) //suppression d'un todo
        checkbox.addEventListener('change', e => this.toggle(e.currentTarget))


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
        if (checkbox.checked) {
            this.#element.classList.add('is-completed') //si l'élément est coché, on lui ajoute la classe is-completed
        }else {
            this.#element.classList.remove('is-completed')
        }
    }

}