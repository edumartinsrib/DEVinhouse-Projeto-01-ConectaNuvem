//Get Elementes
const modal = document.getElementById("myModal");
const btnModal = document.getElementById("myBtn");
const spanModal = document.getElementById("itemModal");

const valueInputModal = document.getElementById("valueInputModal");
const valueBtnModal = document.getElementById("valueBtnModal");

const inputItem = document.getElementById("newItemInput");
const formSubmit = document.getElementById("newItemForm");
const listBox = document.getElementById("items");
const deleteAll = document.getElementById("deleteAll");
const deleteChecked = document.getElementById("deleteChecked");
const nullInput = document.querySelector(".hidden");
const listLocalStorage = "listShop";
let valorModal = 0;

let arrItem = [];

// search list in localStorange
const listJSON = JSON.parse(localStorage.getItem(listLocalStorage));

if (listJSON != null) {
  arrItem = listJSON;
}

deleteChecked.addEventListener('click', () =>{
  
  removeItemChecked();
})

deleteAll.addEventListener("click", () => {
  
});

//function to render a screen with updates
function renderScreen() {
  const items = JSON.parse(localStorage.getItem(listLocalStorage));

  if (!items) {
    listBox.innerHTML = '';
    return;
  }

  let htmlCode = "";
  let checkedValue = "";

  items.forEach((item) => {
    checkedValue = item.checked ? "checked" : "";
    htmlCode += `
    <li class="content input-group ${checkedValue}" id="${item.id}">
    <input type="checkbox" class="form-check-input chk" ${checkedValue} id="chk-${item.id}"/> 
    <span id="txt-${item.id} "class="lineThrough text itemList"> ${item.text}</span> 
    <button id="btn-${item.id}" class="delete action fa-solid fa-trash-can">X</button> 
    </li>`;
  });
  listBox.innerHTML = htmlCode;

  //-----------------Disparo dos eventos dinâmicos -----------------

  //Deletar Item da Lista
  var buttons = document.getElementsByClassName("delete"); // take all DOM elements buttons that have an 'remove'

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", removeItem);
  }

  //edit item list
  var itemText = document.getElementsByClassName("lineThrough"); //  take all DOM elements span that have an 'Linethrough'

  for (var i = 0; i < itemText.length; i++) {
    itemText[i].addEventListener("focusout", editItem);
    itemText[i].addEventListener("dblclick", contentEditable);
  }

  var buttons = document.getElementsByClassName("chk"); // take all DOM elements that have an 'chk' checkboxes

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", boxChecked);
  }
}

//variable's functions for Listeners - Edit/Delete

var boxChecked = function () {
  var parent = this.parentNode;

  var id = this.getAttribute("id"); // variável id criada para receber o atual objeto-DOM referente ao id do checked

  id = id.replace("chk-", "");

  arrItem = getList(); //

  let result = arrItem.filter(function (el) {
    return el.id == id;
  });
  

  for (let element of result) {
    let index = arrItem.indexOf(element);
    arrItem[index].checked = this.checked;}

  if (this.checked) {
    parent.classList.add("checked", "animate__animated", "animate__pulse");
    modal.style.display = "block";
  } else {
    parent.classList.remove("checked", "animate__animated", "animate__pulse");
    parent.classList.add("noChecked");
  }

  localStorage.setItem(listLocalStorage, JSON.stringify(arrItem)); //
  //
};



function adicionarValor(ID) {
  let result = arrItem.filter(function (el) {
    return el.id == id;
  });

  for (let element of result) {
    let index = arrItem.indexOf(element);
    arrItem[index].checked = this.checked;
    //textModal = arrItem[index].text
  }
}

//Edit content text on doubleclick
var contentEditable = function () {
  const addAttributte = this.setAttribute("contenteditable", true);
  this.focus();
};

//Update content text in focus out - Array/LocalStorage
var editItem = function () {
  var id = this.getAttribute("id"); // variável id criada para receber o atual objeto-DOM referente ao id do botão remover que o usuário clicar. O this representa o objeto-DOM atual.
  var text = this.textContent;

  id = id.replace("txt-", "");
  arrItem = getList(); //

  let result = arrItem.filter(function (el) {
    return el.id == id;
  });

  for (let element of result) {
    let index = arrItem.indexOf(element);
    arrItem[index].text = text;
  }

  localStorage.setItem(listLocalStorage, JSON.stringify(arrItem)); //
  renderScreen(); // Render Screen
};

//Remove item from Array/LocalStorage
var removeItem = function () {
  var id = this.getAttribute("id"); // get id from object
  id = id.replace("btn-", ""); //adjust id for search in local storage
  arrItem = getList(); //

  let result = arrItem.filter(function (el) {
    return el.id == id;
  });

  //loop for remove item by index
  for (let element of result) {
    let index = arrItem.indexOf(element);
    arrItem.splice(index, 1);
  }

  localStorage.setItem(listLocalStorage, JSON.stringify(arrItem)); //
  renderScreen(); // Render Screen
};



//Function to add new item with ID generate
function addItem(text, value, qtd) {
  const newID = Date.now() * Math.random();
  const itemArray = { text, checked: false, id: newID, value: value, qtd: qtd };
  arrItem.push(itemArray);
}

//Get LocalStorage items
const getList = function () {
  var getList_string = localStorage.getItem(listLocalStorage); // Pega o conteúdo/valor da chave 'todos' do 'localStorage' e armazena na variável 'todos_string'
  if (getList_string != null) {
    // If  array not null, then do conversion JSON in array.
    return JSON.parse(getList_string);
  }
};

//Render items onLoad form
renderScreen();

//Listener Events

// When the user clicks on the button, open the modal
btnModal.addEventListener("click", () => {
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
valueBtnModal.addEventListener("click", () => {
  if (valueInputModal.value) {
    valorModal = parseInt(valueInputModal.value);

    modal.style.display = "none";
  } else {
    return alert("Para prosseguir é necessário informar o valor do item!");
  }
});

formSubmit.addEventListener("submit", (e) => {
  //capture submit
  e.preventDefault();

  if (!inputItem.value) {
    nullInput.hidden = false;
    return;
  } else {
    nullInput.hidden = true;
  }

  addItem(inputItem.value.trim(), 0, 0);
  localStorage.setItem(listLocalStorage, JSON.stringify(arrItem));
  inputItem.value = "";
  inputItem.focus();
  renderScreen();
});

function deleteAllItems() {
  localStorage.clear();
  arrItem = [];
  console.log("deleteAllItems ~ arrItem", arrItem)
}
