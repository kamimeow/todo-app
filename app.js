document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    storedTasks.forEach((task) => tasks.push(task));
    updateTasksList();
    updateStats();
  }
});

const tasks = [];

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const newTaskButton = document.getElementById("newTask");
const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text: text, completed: false });
    console.log(tasks);
    updateTasksList();
    updateStats();
    saveTasks();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
  updateStats();
  saveTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};
const editTask = (index) => {
  const taskInput = document.querySelector("textarea");

  taskInput.value = tasks[index].text;
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

const updateStats = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = (completedTasks / totalTasks) * 100;
  const progressBarElement = document.getElementById("progress");
  progressBarElement.style.width = `${progress}%`;

  document.getElementById(
    "numbers"
  ).innerText = `${completedTasks} / ${totalTasks}`;

  if (tasks.length && completedTasks === totalTasks) {
    blastConfetti();
  }
};

const updateTasksList = () => {
  const taskList = document.getElementById("todo-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
    <div class="list-element">
        <div class="task ${task.completed ? "completed" : ""}" >
            <input type="checkbox" class="checkbox" ${
              task.completed ? "checked" : ""
            }></input>
            <p>${task.text}</p>
        </div>    
            <div class="icons">
                <img src="/img/edit-48.png" onClick="editTask(${index})"/>
                <img src="/img/delete-48.png" onClick="deleteTask(${index})"/>
            </div>
    </div>            
    `;
    listItem.addEventListener("change", () => toggleTaskComplete(index));
    taskList.append(listItem);
  });
};
newTaskButton.addEventListener("click", function (event) {
  event.preventDefault();
  addTask();
  document.querySelector("textarea").value = "";
});

const blastConfetti = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
