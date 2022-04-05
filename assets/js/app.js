//Get Elementes
const inputItem = document.getElementById("newItemInput");
const formSubmit = document.getElementById("newItemForm");
const listBox = document.getElementById("items");
const listLocalStorage = "listShop";

let arrItem = [];

// search list in localStorange
const listJSON = JSON.parse(localStorage.getItem(listLocalStorage));

if (listJSON != null) {
  arrItem = listJSON;
}

//Listener Events
formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();

  addItem(inputItem.value.trim(), 0, 0);

  localStorage.setItem(listLocalStorage, JSON.stringify(arrItem));

  inputItem.value = "";
  inputItem.focus();
  renderScreen();
});

function renderScreen() {
  const items = JSON.parse(localStorage.getItem(listLocalStorage));

  if (!items) {
    return;
  }
  let htmlCode = "";

  items.forEach((item) => {
    htmlCode += `
    <li class="content " id="${item.id}">
    <input type="checkbox" class="form-check-input chk" id="chk-${item.id}"/> 
  
    <span id="txt-${item.id} "class="lineThrough itemList" contenteditable="true"> ${item.text}</span> 
    <button id="btn-${item.id}" class="delete fa-solid fa-trash-can">X</button> 
    </li>`;
  });
  listBox.innerHTML = htmlCode;

  //-----------------Disparo dos eventos dinâmicos -----------------

  //Deletar Item da Lista

  var buttons = document.getElementsByClassName("delete"); // Pegamos todos os elementos do DOM que possuem a class 'remove' e armazenamos na variável 'buttons'.
  for (var i = 0; i < buttons.length; i++) {
    // Iteramos nossos elementos e adicionamos para cada elemento com a class 'remove' o addEventListener conectado com o evento 'click' e o callback da função.
    buttons[i].addEventListener("click", removeItem);
  }

  //Editar Item da Lista

  var itemText = document.getElementsByClassName("lineThrough"); // Pegamos todos os elementos do DOM que possuem a class 'itemList' e armazenamos na variável 'buttons'.

  for (var i = 0; i < itemText.length; i++) {
    // Iteramos nossos elementos e adicionamos para cada elemento com a class 'remove' o addEventListener conectado com o evento 'click' e o callback da função.
    itemText[i].addEventListener("focusout", editItem);
  }
}

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

var removeItem = function () {
  var id = this.getAttribute("id"); // variável id criada para receber o atual objeto-DOM referente ao id do botão remover que o usuário clicar. O this representa o objeto-DOM atual.
  id = id.replace("btn-", "");
  arrItem = getList(); //

  let result = arrItem.filter(function (el) {
    return el.id == id;
  });

  for (let element of result) {
    let index = arrItem.indexOf(element);
    arrItem.splice(index, 1);
  }

  localStorage.setItem(listLocalStorage, JSON.stringify(arrItem)); //
  renderScreen(); // Render Screen
};

function addItem(text, value, qtd) {
  const newID = Date.now() * Math.random();
  const itemArray = { text, checked: false, id: newID, value: value, qtd: qtd };
  arrItem.push(itemArray);
}

const getList = function () {
  var getList_string = localStorage.getItem(listLocalStorage); // Pega o conteúdo/valor da chave 'todos' do 'localStorage' e armazena na variável 'todos_string'
  if (getList_string != null) {
    // Verifica se o array de elementos não é nulo. Caso true então retornará a conversão de um JSON string para um Javascript data.
    return JSON.parse(getList_string);
  }
};

renderScreen();

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}