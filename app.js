const todoInput = document.querySelector('.todo-input')
const addBtn = document.querySelector('.add')
const todoContainer = document.querySelector('.todo-container')
const todoHeading = document.querySelector('.todo-heading')
const clearAllBtn = document.querySelector('.clear-all')
let todoArray

if(localStorage.getItem('todo')){
  todoArray = JSON.parse(localStorage.getItem('todo'))
}else{
  todoArray = []
}

localStorage.setItem('todo', JSON.stringify(todoArray))
const data = JSON.parse(localStorage.getItem('todo'))

const todoMaker = (str) => {
  let div = document.createElement('div')
  div.setAttribute('class', 'added-todo')
  let input = document.createElement('input')
  // input.setAttribute('readonly', 'readonly')
  input.setAttribute('class', 'task-name')
  input.setAttribute('name', 'task')
  input.value = str
  let checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.setAttribute('name', 'task')
  let button = document.createElement('button')
  button.setAttribute('class', 'delete')
  button.innerHTML = '<i class="fa-solid fa-trash"></i>'
  div.appendChild(checkbox)
  div.appendChild(input)
  div.appendChild(button)
  todoContainer.appendChild(div)

  input.addEventListener('change', () => {
    const todoId = Array.from(todoContainer.children).indexOf(button.parentElement)
    const value = input.value
    todoArray[todoId] = value
    localStorage.setItem('todo', JSON.stringify(todoArray))
  })

  checkbox.addEventListener('click', () => {
    if(checkbox.checked){
      checkbox.nextElementSibling.style.textDecoration = 'line-through'
      checkbox.dataset.checked = 'true'
    }else{
      checkbox.nextElementSibling.style.textDecoration = 'none'
      checkbox.dataset.checked = 'false'
    }
  })

  button.addEventListener('click', () => {
    const todoIndex = Array.from(todoContainer.children).indexOf(button.parentElement)
    button.parentElement.remove()
    showOrHide()
    todoArray.splice(todoIndex, 1)
    localStorage.setItem('todo', JSON.stringify(todoArray))
  })
}

const addTask = (e) => {
  if(todoInput.value){
    e.preventDefault()
    todoArray.push(todoInput.value)
    localStorage.setItem('todo', JSON.stringify(todoArray))
    todoMaker(todoInput.value)
    todoInput.value = ''
    showOrHide()
  }
}

addBtn.addEventListener('click', addTask)

const showOrHide = () => {
  if(todoContainer.children.length > 0){
    todoHeading.innerHTML = 'TODO'
    clearAllBtn.innerHTML = '<i class="fa-solid fa-delete-left"></i> CLEAR ALL'
  }else{
    todoHeading.innerHTML = ''
    clearAllBtn.innerHTML = ''
  }
}

data.forEach(todo => {
  todoMaker(todo)
  showOrHide()
})

todoInput.addEventListener('keypress', e => {
  if(e.key === 'Enter'){
    e.preventDefault()
    addBtn.click()
  }
})

const clearAllTasks = () => {
  clearAllBtn.addEventListener('click', () => {
    localStorage.clear()
    const addedTodos = document.querySelectorAll('.added-todo')
    addedTodos.forEach(addedTodo => {
      addedTodo.remove()
    })
    showOrHide()
    todoArray = []
  })
} 

clearAllTasks()


// Completed task or checked tasks should remain checked even if you refresh 





