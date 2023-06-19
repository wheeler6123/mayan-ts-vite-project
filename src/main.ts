import { v4 as uuidv4 } from 'uuid'

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

const list = document.querySelector('#list') as HTMLUListElement
const input = document.querySelector('#new-task-title') as HTMLInputElement
const form = document.getElementById('new-task-form') as HTMLFormElement
const tasks: Task[] = loadTasks();
tasks.forEach(task => addListItem(task))

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(input?.value == '' || input?.value == null) return;

  const newTask = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  tasks.push(newTask);
  saveTasks();

  addListItem(newTask);
  input.value = '';
})

function addListItem(task: Task) {
  const item = document.createElement('li')
  const label = document.createElement('label')
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.checked = checkbox.checked

  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem('TASKS')
  if(taskJSON == null) return []
  return JSON.parse(taskJSON)
}
