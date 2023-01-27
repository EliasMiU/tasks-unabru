window.addEventListener("DOMContentLoaded", () => {

  /**
   * elementos del UI
   */
  let contentTask = document.querySelector('.content_task');
  
  let DB_Tasks = [];
  
  /**
   * Verificar si existe la items DB_Tasks en el localStorage
   * Posteriormente si existe, llamarlo y cargarlo en una variable para manipular los datos
   * Todo esto depues de pasarlo a un dato manipulable por JS
   */

  if(!localStorage.getItem('DBTasks_str')){
    console.log("No existe nada aqui");
  }else {
    getTasks();
  }

  /**
   * Obtener array del locaStorage
   */
  
  function getDbTasks(){
    return JSON.parse( localStorage.getItem('DBTasks_str'));
  }
  
  function getTasks(){
    DB_Tasks = getDbTasks();
    contentTask.innerHTML = "";
    
    DB_Tasks.map((elemento, index) => {
      createTask = `<article id="${index}" data-check="${elemento.check}" class="item-task">
      <div class="head-tasks">
        <div class="name-task">${elemento.name}</div>
        <div class="icon-controls">
          <img class="item-control details" src="./assets/icons/detalles.svg" />
          <img class="item-control check" src="./assets/icons/listo-white.svg" />
          <img class="item-control delete" src="./assets/icons/delete-white.svg" />
        </div>
      </div>
      <div class="details-container">
        <div class="box-details">
          <div class="extract">
            <p>${elemento.details}</p>
          </div>
          <span class=""><span>Hora registro: </span>${elemento.hour}</span>
        </div>
      </div>
      </article>`
  
      contentTask.innerHTML += createTask;
    });
  }


  /**
   * Registras el array de tareas en el localStorage
   */

  function setTasks(dateTasks){
    localStorage.setItem('DBTasks_str', JSON.stringify(dateTasks));
  }

  /**
   * Guardar datos en el array de tareas al emviar el formulario
   */
  let formTask =  document.querySelector('form');
  formTask.addEventListener("submit", e => {
    e.preventDefault();
    let nametask = document.querySelector('#nameTask');
    let detailsTask = document.querySelector('#detailsTask');
    let today = new Date();
    let fecha = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
    let hour = `${today.getHours()}:${today.getMinutes()}`;

    if (nametask.value === "") {
      alert("Campo tarea vacio");
      return;
    } else {
      let newRegisterTask = {
        name: nametask.value,
        details: detailsTask.value,
        date: fecha,
        hour: hour,
        check: false
      }
  
      DB_Tasks.push(newRegisterTask);
  
      setTasks(DB_Tasks);
      getTasks();
      formTask.reset();
      activeForm();
    }

  });



  /**
   * Leer evento click en los item para borrar o indicar la tarea realizada
   */
  let containsTask = document.querySelector('.content_task');
  containsTask.addEventListener('click', eventy => {
    let itemSelect = eventy.target;
    let btnDelete = itemSelect.matches('.delete');
    let btnCheck = itemSelect.matches('.check')
    let btnDetails = itemSelect.matches('.details');

    if(btnDelete){
      deleteItem(itemSelect);
    }else if(btnCheck){
      checkItem(itemSelect);
    } else if(btnDetails){
      showDetails(itemSelect);
    }
  });
  
  /**Eliminas item de la lista */
  function deleteItem(item) {
    let idItemDelete = item.closest('.item-task').getAttribute('id');
    DB_Tasks = getDbTasks();
    DB_Tasks.splice(idItemDelete, 1);
    console.log(idItemDelete);
    setTasks(DB_Tasks);
    getTasks()
    
  }

  /**Tarea realizada */
  function checkItem(item) {
    let idItemCheck = item.closest('.item-task').getAttribute('id');
    DB_Tasks = getDbTasks();
    DB_Tasks[idItemCheck].check = DB_Tasks[idItemCheck].check === false ? true : false;
    console.log(idItemCheck);
    setTasks(DB_Tasks);
    getTasks();
  }

  /**Show Details */

  function showDetails(item) {
    let idItemShowDetails = item.closest('.item-task');
    idItemShowDetails.classList.toggle('active');

  }


  /**
   * Activar formulario
   */

  document.querySelector(".add-task").addEventListener('click', ()=>{
    activeForm();
  });
  
  function activeForm(){
    let formTask = document.querySelector(".container-form");
    formTask.classList.toggle("active"); 
  }


});