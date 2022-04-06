/* Captura dos elementos do HTML */

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
const valueTotal = document.getElementById('valueTotal');

//Define Variáveis globais
const listLocalStorage = "listShop";
var idItem = "";
let valorModal = 0;
let arrItem = [];

// Procura se há alguma lista salva no localStorage
const listJSON = JSON.parse(localStorage.getItem(listLocalStorage));

if (listJSON != null) {
  arrItem = listJSON; //se houver, o array do JS é atualizado com os valores do LocalStorage
}

//Evento click no botão 'Apagar itens comprados'
deleteChecked.addEventListener("click", () => {
  removeItemChecked();
});

//Evento click no botão 'apagar todos os itens da lista'
deleteAll.addEventListener("click", () => {
  deleteAllItems();
  renderScreen();
});

//Função principal e exclusiva para renderização dos elementos na tela
function renderScreen() {
  const items = JSON.parse(localStorage.getItem(listLocalStorage)); //Recupera os itens salvos no localStorage 
  let htmlCode = ""; //variável que conterá o código HTML após iteração
  let checkedValue = ""; //Variável para guardar o valor checked true/false na iteração

  if (!items) {
    listBox.innerHTML = ""; //Se não houver nada salvo, não ocorre a renderização de elementos 
    return;
  }

  //Laço para iteração e criação dos elementos HTMLs, identificando cada elemento com seu ID e prefixo definido pela natureza do elemento
  items.forEach((item) => {
    let valueItemId = item.value.toLocaleString('pt-br', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2}) 
    checkedValue = item.checked ? "checked" : ""; //checa se o campo deve estar marcado na renderização com base no valor do array
    valueItemId = item.checked ? valueItemId : ""; //chega se o campo não está marcado não traz o valor do item na renderização
    htmlCode += `
    <li class="content input-group ${checkedValue}" id="${item.id}">
    <input type="checkbox" class="form-check-input chk" ${checkedValue} id="chk-${item.id}"/> 
    <span id="txt-${item.id} "class="lineThrough text itemList"> ${item.text}</span> 
    <span id="value-${item.id} "class="valueItem"> ${valueItemId}</span> 
    <button id="btn-${item.id}" class="delete action">X</button> 
    </li>`;
  });
  listBox.innerHTML = htmlCode; //renderiza os componentes na tela

  //-----------------Disparo dos eventos dinâmicos -----------------

  //Cria as funções em todos os 'buttons' para deletar items da lista 
  var buttons = document.getElementsByClassName("delete"); // take all DOM elements buttons that have an 'remove'

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", removeItem);
  }

  //Cria as funções em todos os elementos 'span' com a descrição do item, permitindo a edição após duploclick e fazendo a edição com o focusout
  var itemText = document.getElementsByClassName("lineThrough"); //  take all DOM elements span that have an 'Linethrough'

  for (var i = 0; i < itemText.length; i++) {
    itemText[i].addEventListener("focusout", editItem); //função focusout para alterar array/localstorage com base na descrição atualizada do elemento
    itemText[i].addEventListener("dblclick", contentEditable); //função para liberar a edição do elemento após duploclick
  }

  //Cria as funções para todos os checkboxs renderizados
  var check = document.getElementsByClassName("chk"); // 

  for (var i = 0; i < buttons.length; i++) {
    check[i].addEventListener("click", boxChecked); //função para alterar o status checked do elemento no array/localstorage, assim como abrir modal para informar valores
  }
  
  //Por fim, é renderizado no footer o valor atualizado dos itens 'checkeds'

  sumTotal()
  
}

//Variavel funcional com as seguintes funcionalidades: Alteração do array/localstorage com atualização do 'checked', 
//inclusão de animações de movimento/alteração de cor do elemento, atualização do valor total da compra.
var boxChecked = function () {
  var parent = this.parentNode; //Obtém a referência do componente pai para inclusão das animações/alterações de background color

  var id = this.getAttribute("id"); // variável id criada para receber o id do componente 'checked'

  id = id.replace("chk-", ""); //Remove o prefixo determinado para obter o mesmo ID do array/localStorage 

  arrItem = getList(); //Atualiza o array com base no localStorage

  let result = arrItem.filter(function (el) {
    return el.id == id; //filtra o array para obter um novo array apenas com o ID identificado
  });

  for (let element of result) {
    let index = arrItem.indexOf(element);
    arrItem[index].checked = this.checked; //altera o checked do valor do array com base no elemento marcado 
    !this.checked ? arrItem[index].value = 0 : '';
  }

  localStorage.setItem(listLocalStorage, JSON.stringify(arrItem)); //altera o checked do valor do localStorage com base no elemento marcado

  //verifica itens marcados e adiciona/remove classes para animação e cor no elemento, a depender do estado.
  if (this.checked) {
    parent.classList.add("checked", "animate__animated", "animate__pulse");
    idItem = id;
    modal.style.display = "block";
  } else {
    parent.classList.remove("checked", "animate__animated", "animate__pulse");
    parent.classList.add("noChecked");
    //realiza a atualização do valor total em tela - é reexecutada a função, pois para os efeitos de animação ocorrerem, a tela não pode ser renderizada novamente
    sumTotal()
    //limpa o iD para o caso de um novo item ser marcado
    idItem = "";
  }
  //
  //
};


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
  var getList_string = localStorage.getItem(listLocalStorage); //
  if (getList_string != null) {
    return JSON.parse(getList_string);
  }
};

//Render items onLoad form
renderScreen();

//Listener Events

// When the user clicks on <span> (x), close the modal
valueBtnModal.addEventListener("click", () => {
  if (valueInputModal.value) {
    valorModal = parseFloat(valueInputModal.value);
    addValueArr(idItem, valorModal);
    valueInputModal.value = '';
    modal.style.display = "none";
  } else {
    return alert("Para prosseguir é necessário informar o valor do item!");
  }
});

var addValueArr = (idItem, valor) => {
  let result = arrItem.filter(function (el) {
    return el.id == idItem;
  });

  for (let element of result) {
    let index = arrItem.indexOf(element);
    arrItem[index].value = valor;
  }

  localStorage.setItem(listLocalStorage, JSON.stringify(arrItem)); //
  renderScreen(); // Render Screen
};

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
  console.log("deleteAllItems ~ arrItem", arrItem);
}

function deleteCheckeds() {
  var id = this.getAttribute("id");

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
}

function sumTotal(){ 
  
  arrItem = getList();

  let result = arrItem.filter(function (el) {
    return el.checked == true;
  });
  
  const accTotal = result.reduce((acc, value) => acc + value.value, 0)

  accTotal ? valueTotal.innerText = accTotal.toLocaleString('pt-br', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2}) : valueTotal.innerText = 'R$ 0,00'
  

}