

   // Función que crea los nodos 
   function createNode(type) {
        var node = document.createElement(type);
        return node;
    }
    // Crear y agregar nodos 
    var app = document.getElementById('app');

    var container = createNode('div');
    container.className = "container";
    app.appendChild(container);

    var h1 =  createNode('h1');
    var text = document.createTextNode("Todo APP");
    container.appendChild(h1);
    h1.appendChild(text);

    var row = createNode('div');
    row.className = "row";
    container.appendChild(row);

    var sixcolumns = createNode('div');
    sixcolumns.className = "six columns";
    row.appendChild(sixcolumns);

    var task = createNode('label');
    var text = document.createTextNode("Task:");
    task.className = "task";
    sixcolumns.appendChild(task);
    task.appendChild(text);
    
    var form = createNode('form');
    form.id = "form";
    form.action = "#";
    sixcolumns.appendChild(form);

    var textarea = createNode('textarea');
    textarea.className = "u-full-width";
    textarea.id = "task";
    form.appendChild(textarea);

    var input = createNode('input');
    input.className = "button u-full-width button-primary";
    input.type = "submit"
    input.value = "Add"
    form.appendChild(input);

    var sixcolumns2 = createNode('div');
    sixcolumns2.className = "six columns";
    row.appendChild(sixcolumns2);

    var h2 =  createNode('h2');
    var text = document.createTextNode("My tasks");
    sixcolumns2.appendChild(h2);
    h2.appendChild(text);

    var list =  createNode('div');
    list.id = "task-list";
    sixcolumns2.appendChild(list);

    var ul =  createNode('ul');
    list.appendChild(ul);
    
    document.body.appendChild(app);
    console.log(app)
    





//las variables
const taskList = document.getElementById('task-list');

///los event listeners
eventListeners();

function eventListeners() {
    //cuando se envia el formuladio
    document.querySelector('#form').addEventListener('submit', addTask);
    //borrar tweets
    taskList.addEventListener('click', deleteTask);
    //contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);

}

//funciones

//añadir tweet del formulario

function addTask(e) {
    e.preventDefault();
    //leer el valor del text area
    var task = document.getElementById('task').value;
    if (task != ""){
        //crear boton de eliminar
        var deleteButton = document.createElement('a');
        deleteButton.classList = 'delete-task';
        deleteButton.innerText = 'x';
        //crear un elemento y añadir el elemento a la lsita
        var ul =  document.querySelector('ul');
        var li = document.createElement('li');
        li.innerText = task;
        //añade el boton de borrar al tweet
        li.appendChild(deleteButton);
        //añade el tweet a la lista
        taskList.appendChild(ul);
        ul.appendChild(li);

        //agregar a local
        addTaskLocalStorage(task);
        document.getElementById('task').value = "";
    } else {
        alert("Please, add a task");
    }


}
//elimina el tweet del DOM
function deleteTask(e) {
    e.preventDefault();
    if (e.target.className === 'delete-task') {
        e.target.parentElement.remove();
        deleteTaskLocalStorage(e.target.parentElement.textContent);

        //alert('Tweet eliminado')
    }

}

//mostrar datos de localStorage en la lista
function localStorageListo() {
    var tasks;
    tasks = getTaskLocalStorage();
    tasks.forEach(function(task) {

        var deleteButton = document.createElement('a');
        deleteButton.classList = 'delete-task';
        deleteButton.innerText = 'x';
        //crear un elemento y añadir el elemento a la lsita
        var ul =  document.querySelector('ul');
        var li = document.createElement('li');
        li.innerText = task;
        //añade el boton de borrar al tweet
        li.appendChild(deleteTask);
        //añade el tweet a la lista
        taskList.appendChild(ul);
        ul.appendChild(li);

    })
}

// agrega a el local storage
function addTaskLocalStorage(task) {
    var tasks;
    tasks = getTaskLocalStorage();
    // Añadir el nuevo tweet que es un areglo
    tasks.push(task);
    // Convertir de string a arreglo para local storage
    localStorage.setItem('task', JSON.stringify(tasks));
}

// se encarga de comprovar qeu se tengan elementos en localStorage
// y retorna un areglo
function getTaskLocalStorage() {
    var tasks;
    // Revisamos los valoes de local storage
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

//eliminar tweet de local storage

function deleteTaskLocalStorage(task) {
    var tasks, deleteTask;
    //parte que se encarga de seleccionar todo a partir de
    //un areglo y posterior mente elimina el ultimo caracter
    // en este caso la x
    deleteTask = tasks.substring(0, tasks.length - 1);
    tasks = getTaskLocalStorage();
    tasks.forEach(function(task, index) {
        if (deleteTask === tasks) {
            tasks.splice(index, 1);
        }
    });
    //esto lo vuelve un string
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
var ulList = document.querySelector('ul');
ulList.addEventListener('click',function(event){

    if(event.target.tagName === "LI"){

        event.target.classList.toggle('checked');

    }
},false);