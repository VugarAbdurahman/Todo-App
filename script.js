const inputValue = document.querySelector(".add-task input"),
  taskBox = document.querySelector(".task-box")
const filters = document.querySelectorAll(".filters span")

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active")
    btn.classList.add("active")
    showTodos(btn.id)
  })
})

// getting todos in local storage
let editId
let isEdited = false
let todos = JSON.parse(localStorage.getItem("todo-list"))

function showTodos(filter) {
  let li = ""
  if (todos) {
    todos.forEach((todo, id) => {
      let isCompleted = todo.status == "completed" ? "checked" : ""
      if (filter == todo.status || filter == "all") {
        li += `
             <li class="task">
               <label for="${id}">
                 <input onclick ="updateStatus(this)" type="checkbox" id="${id}"
                  ${isCompleted} />
                 <p class="${isCompleted}">${todo.name}</p>
               </label>
               <div class="settings">
                 <img src="/images/edit(1).png" onclick = "editTask(${id}, 
                   '${todo.name}')"/>
                 <img src="/images/delete.png" onclick = "deleteTask(${id})"/>
               </div>
             </li>
              `
      }
    })
  }
  taskBox.innerHTML =
    li || `<span class='empy'>You don't have any task here</span>`
}

showTodos("all")

// Edit Task
function editTask(taskId, taskName) {
  editId = taskId
  isEdited = true
  inputValue.value = taskName
}

// Delete task
function deleteTask(selectedId) {
  todos.splice(selectedId, 1)
  localStorage.setItem("todo-list", JSON.stringify(todos))
  showTodos("all")
}

//  Task checked
function updateStatus(selectedTask) {
  let taskChecked = selectedTask.parentElement.lastElementChild
  if (selectedTask.checked) {
    taskChecked.classList.add("checked")
    todos[selectedTask.id].status = "completed"
  } else {
    taskChecked.classList.remove("checked")
    todos[selectedTask.id].status = "pending"
  }
  localStorage.setItem("todo-list", JSON.stringify(todos))
}

function addTasks() {
  const addTaskButton = document.querySelector(".add")

  function handleAddTask(e) {
    if (e.key === "Enter" || e.type === "click") {
      let userTask = inputValue.value.trim()

      if (userTask) {
        if (!isEdited) {
          if (!todos) {
            todos = []
          }
          let taskInfo = {
            name: userTask,
            status: "pending",
          }

          todos.push(taskInfo)
        } else {
          todos[editId].name = userTask
        }

        inputValue.value = ""

        localStorage.setItem("todo-list", JSON.stringify(todos))

        showTodos("all")
      }
    }
  }

  // get enter
  inputValue.addEventListener("keyup", handleAddTask)

  // click button
  addTaskButton.addEventListener("click", handleAddTask)
}

addTasks()
