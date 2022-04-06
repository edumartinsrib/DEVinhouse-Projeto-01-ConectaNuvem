/* Define os elementos */
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

let arrItem = []; //Cria o Array em branco

// Procura lista salva no local Storage
const listJSON = JSON.parse(localStorage.getItem(listLocalStorage));

if (listJSON != null) {
  arrItem = listJSON; //se houver alguma lista, preenche o valor do Array com lista do LocalStorage
}

/* Evento de Submit do Formulário - Captura Enter/Click*/

formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputItem.value) {
    nullInput.hidden = false;
    return;
  } else {
    nullInput.hidden = true;
  }

  addItem(inputItem.value.trim(), 0, 0); //Função para gerar novo id e criar novo item no Array

  localStorage.setItem(listLocalStorage, JSON.stringify(arrItem)); //Atualizada a lista do LocalStorage com base nos dados do Array

  inputItem.value = ""; //Apaga valor do campo Input
  inputItem.focus(); //Foca no campo input para nova inserção de dados
  renderScreen(); //Renderiza os elementos com base no localStorage (atualizado)
});

/* Função principal para renderizar elementos (LI's) na tela */
function renderScreen() {
  const items = JSON.parse(localStorage.getItem(listLocalStorage));

  if (!items) {
    //valida localStorage vazio - Se vazio então dá return e tela se mantém vazia
    return;
  }

  let htmlCode = "";
  let checkedValue = "";

  items.forEach((item) => {
    //Itera os dados obtidos do localStorage criando os elementos na tela com os atributos necessários
    checkedValue = item.checked ? "checked" : "";
    htmlCode += `
    <li class="content input-group ${checkedValue}" id="${item.id}">
    <input type="checkbox" class="form-check-input chk" ${checkedValue} id="chk-${item.id}"/> 
    <span id="txt-${item.id} "class="lineThrough text itemList"> ${item.text}</span> 
    <button id="btn-${item.id}" class="delete action fa-solid fa-trash-can">X</button> 
    </li>`;
  });
  listBox.innerHTML = htmlCode; //Adiciona o código HTML iterado acima no Elemento UL da tela

  /* Funções para disparo dos eventos dinamicos */

  //Deletar Itens da Lista
  var buttons = document.getElementsByClassName("delete"); // São capturados todos os elementos que contenham a classe 'delete', ou seja, os buttons criados para deletar itens.

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", removeItem); //Disparo para remoção do item referente ao checkbox clicado
  }

  //Editar Itens da Lista
  var itemText = document.getElementsByClassName("lineThrough"); // São capturados todos os elementos que contenham a classe 'LineThrough', ou seja, os spans com o conteúdo do nome do item

  for (var i = 0; i < itemText.length; i++) {
    itemText[i].addEventListener("focusout", editItem); //disparo de evento ao perder foco com a atualização do valor do campo.
    itemText[i].addEventListener("dblclick", contentEditable); //disparo de evento  duploclick para liberar a edição do elemento span criado para o nome do item.
  }

  //Funções relativas ao Checkbox
  var buttons = document.getElementsByClassName("chk"); // Pegamos todos os elementos do DOM que possuem a class 'remove' e armazenamos na variável 'buttons'.

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", boxChecked); //Disparo ao marcar checkbox - Atualizando valor do Array e LocalStorage
  }
}

/* Funções executada ao marcar/desmarcar Checkbox*/
var boxChecked = function () {
  var parent = this.parentNode;

  if (this.checked) {
    //Ao marcar o checkbox, são adicionadas classes com funções específicas
    parent.classList.add("checked");
    parent.classList.add("animate__animated"); //Add Funcionalidade de Animações ao elemento via biblioteca Animate.css
    parent.classList.add("animate__flipInX"); //Executa animação de flip ao marcar o checkbox
  } else {
    parent.classList.remove("checked");
    parent.classList.remove("animate__animated"); //remove a função de animações no elemento
    parent.classList.remove("animate__flipInX"); //remove animação específica no elemento

  var id = this.getAttribute("id"); // variável id criada para receber o atual objeto-DOM referente ao id do checked

  id = id.replace("chk-", "");

  arrItem = getList(); //

  let result = arrItem.filter(function (el) {
    return el.id == id;
  });
  
  for (let element of result) {
    let index = arrItem.indexOf(element);
    arrItem[index].checked = this.checked;}

  localStorage.setItem(listLocalStorage, JSON.stringify(arrItem)); //
  //
}};



/* Funções executada para permitir a edição do conteúdo do item após duplo click*/
var contentEditable = function () {
  const addAttributte = this.setAttribute("contenteditable", true); //adiciona atributo ao elemento
  this.focus(); //retorna o foco ao elemento à ser editado - Ao perder foco a função edititem é executada
};

/* Funções para editar o item alterado no array/local storage - tem inicio após perder o foco no campo de texto*/
var editItem = function () {
  var id = this.getAttribute("id"); // variável id criada para receber o referente ao id elemento do objeto.
  var text = this.textContent; //variavel criada para obter o texto após edição

  id = id.replace("txt-", ""); //a ID do item foi replicada nos elementos com um prefixo - aqui é feito o replace para a id do elemento corresponder a ID do item no array/localstorage
  arrItem = getList(); //Recupera o array do JS

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
