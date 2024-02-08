const tasksOl = document.querySelector("#tasks");
  const taskInput = document.querySelector("#new-task");
  const addTaskButton = document.querySelector("#add-task");
  const taskTemplate = document.querySelector("#task-template");

  function renderTask(newTask) {
    const taskTemplateClone = taskTemplate.content.cloneNode(true);
    const newTaskElement = taskTemplateClone.querySelector(".task");
    const taskText = newTaskElement.querySelector(".task-text");

    // Adicione o evento de clique para excluir a tarefa
    const deleteButton = taskTemplateClone.querySelector("#delete-button");
    deleteButton.addEventListener("click", () => deleteTask(newTask.id));

    newTaskElement.id = newTask.id;
    taskText.textContent = newTask.text;

    tasksOl.appendChild(taskTemplateClone);
  }

  renderTasksFromLocalStorage();

  addTaskButton.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  function saveTaskToLocalStorage(newTask) {
    const tasks = localStorage.getItem("tasks");
    const parsedTasks = JSON.parse(tasks) || [];

    parsedTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(parsedTasks));
  }

  function renderTasksFromLocalStorage() {
    tasksOl.innerHTML = "";

    const tasks = localStorage.getItem("tasks");
    const parsedTasks = JSON.parse(tasks) || [];

    parsedTasks.forEach((task) => renderTask(task));
  }

  function addTask() {
    const newTaskText = taskInput.value.trim();
    if (newTaskText === '') return;

    const newTask = {
      id: Math.random().toString(16).slice(2),
      text: newTaskText,
    };

    renderTask(newTask);
    saveTaskToLocalStorage(newTask);
    taskInput.value = ''; // Limpar o campo de entrada depois de adicionar a tarefa
  }

  function deleteTask(taskId) {
    const taskToDelete = document.getElementById(taskId);
    taskToDelete.remove();

    const tasks = localStorage.getItem("tasks");
    const parsedTasks = JSON.parse(tasks) || [];

    const filteredTasks = parsedTasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  }