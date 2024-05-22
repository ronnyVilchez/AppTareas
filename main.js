const bt_All = document.querySelector('.bt_All')
const bt_Active = document.querySelector('.bt_Active')
const bt_Complet = document.querySelector('.bt_Complet')
const inputTasks = document.querySelector('.addTasks')
const bt_Add = document.querySelector('.bt_Add')
const lista = document.querySelector('.lista')
const form = document.querySelector('.form')
const formim = document.querySelectorAll('.lista input')

const todos = document.getElementById('todos')
const activas = document.getElementById('activas')
const completas = document.getElementById('completas')
const button = document.querySelector('#button')
const add = document.querySelector('.add')

add.style.display = 'inline'
button.style.display = 'none'


if (localStorage.getItem('array') === null) {
    localStorage.setItem('array', JSON.stringify([]))
}

const tareas = JSON.parse(localStorage.getItem('array'))


/* const tareas = [{
    id: 1,
    title: 'title1',
    completed: ''
}, {
    id: 2,
    title: 'title2',
    completed: ''
}, {
    id: 3,
    title: 'title3',
    completed: ''
}, {
    id: 4,
    title: 'title4',
    completed: ''
}, {
    id: 5,
    title: 'title5',
    completed: ''
}]

 */


allTasks(tareas, lista)

form.addEventListener('submit', (e) => {
    let local = JSON.parse(localStorage.getItem('array'))
    e.preventDefault()
    
    console.log(activo);
    if (inputTasks.value !== '') {

        addTask(local[local.length - 1]?.id + 1 || 1, inputTasks.value, local, lista)
        form.reset()
    }
})
let activo = ''

function fSwitch(local, lista) {
    //let local = JSON.parse(localStorage.getItem('array'))
    switch (activo) {
        case 'act':
            filterUncompleted(local, lista)
            break;
        case 'all':
            allTasks(local, lista)
            break;
    }
}
function addTask(id, title, array, lista) {
    add.style.display = 'inline'
    button.style.display = 'none'
    const obj = {
        id: id,
        title: title,
        completed: false
    }

    array.push(obj)
    localStorage.setItem('array', JSON.stringify(array))
    let local = JSON.parse(localStorage.getItem('array'))
    fSwitch(local, lista)
   // actualizar(local, lista)
}


function showDOM(id, title, completed, lista, clas) {
    const new_task = `
<li ><input class='checkbox' type="checkbox" ${completed && 'checked'} id="${id}" ><label style="text-decoration:${completed === true ? 'line-through' : 'none'}" for="${id}" >${title}</label><i class="${clas}"></i></li>
`
    lista.innerHTML += new_task
}


function actualizar(array, lista) {
    lista.innerHTML = ''
    array.forEach(e => {
        showDOM(e.id, e.title, e.completed, lista, 'none')

    });
}


lista.addEventListener('change', (e) => {
    let local = JSON.parse(localStorage.getItem('array'))
    if (e.target.tagName === 'INPUT') {
        box(e.target);
        style(e.target, e.target.nextElementSibling)
        addTF(parseInt(e.target.id), local, e.target.checked)

    }
})

function style(input, label) {

    if (input.checked === true) {
        label.setAttribute('style', 'text-decoration: line-through ')
    } else { label.setAttribute('style', 'text-decoration: none ') }
}

function box(input) {

    if (input.checked === true) {
        input.setAttribute('checked', 'checked')
    } else { input.removeAttribute('checked') }


}



function addTF(id, array, valor) {

    const index = array.findIndex(e => e.id === id)

    array[index].completed = valor

    localStorage.setItem('array', JSON.stringify(array))


}


todos.addEventListener('click', (e) => {
    e.preventDefault()
    activo = 'all'
    allTasks(tareas, lista)
})

function allTasks(array, lista) {
    todos.classList.add('bordes')
    activas.classList.remove('bordes')
    completas.classList.remove('bordes')
    add.style.display = 'inline'
    button.style.display = 'none'
    let local = JSON.parse(localStorage.getItem('array'))
    lista.innerHTML = ''
    local.forEach(e => {
        showDOM(e.id, e.title, e.completed, lista, 'none')

    })
}


completas.addEventListener('click', () => {
    filtercompleted(tareas, lista)
    lista.addEventListener('click', () => trash(event, lista))
})

button.addEventListener('click', () => deletAll(tareas, lista))

function deletAll(array, lista) {
    let local = JSON.parse(localStorage.getItem('array'))

    local = local.filter(obj => !obj.completed)

    localStorage.setItem('array', JSON.stringify(local))
    filtercompleted(local, lista)
}

/* local.forEach((e,i )=> {
    if ( e.completed === true) {
        local.splice(i,1) 

    }}) */

function trash(e, lista) {

    if (e.target.tagName === 'I') {
        let idInput = parseInt(e.target.previousElementSibling.previousElementSibling.id)
        delet(idInput, lista)
    }

}


function filtercompleted(array, lista) {
    let local = JSON.parse(localStorage.getItem('array'))
    completas.classList.add('bordes')

    todos.classList.remove('bordes')
    activas.classList.remove('bordes')

    add.style.display = 'none'
    button.style.display = 'inline'
    lista.innerHTML = ''

    let style = 'fa-solid fa-trash'
    local.forEach(e => {
        if (e.completed === true) {
            showDOM(e.id, e.title, e.completed, lista, style)
        }
    })
}


function delet(delet, lista) {
    let local = JSON.parse(localStorage.getItem('array'))
    local.forEach((e, i) => {

        if (e.id === delet) {

            local.splice(i, 1)
        }
    })

    localStorage.setItem('array', JSON.stringify(local))
    filtercompleted(local, lista)
}


activas.addEventListener('click', () => {
    activo = 'act'
    
    filterUncompleted(tareas, lista)
})

function filterUncompleted(array, lista) {
    let local = JSON.parse(localStorage.getItem('array'))
    activas.classList.add('bordes')
    completas.classList.remove('bordes')
    todos.classList.remove('bordes')
    add.style.display = 'inline'
    button.style.display = 'none'

    lista.innerHTML = ''
    local.forEach(e => {
        if (e.completed === false) {

            showDOM(e.id, e.title, e.completed, lista, 'none')

        }
    })
}

