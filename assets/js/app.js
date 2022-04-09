import { songEffect } from "./audio.js";

/* Captura dos elementos do HTML */
const btnMain = document.getElementById("btnMain");
const pMain = document.getElementById("msgMain");

const formModal = document.getElementById('modal-form')
const modal = document.getElementById("myModal");
const errModal = document.getElementById("errModal");
const valueInputModal = document.getElementById("valueInputModal");

const inputItem = document.getElementById("newItemInput");
const formSubmit = document.getElementById("newItemForm");
const listBox = document.getElementById("items");
const deleteAll = document.getElementById("deleteAll");
const deleteChecked = document.getElementById("deleteChecked");
const nullInput = document.querySelector(".hidden");
const valueTotal = document.getElementById("valueTotal");


const divEmptyList = document.getElementById("emptyList");
const divFooter = document.getElementById("footer");
const divFooterCredits = document.getElementById('footerCredits')

//Define Variáveis globais
const dayWeek = new Date().getDay();
const listLocalStorage = "listShop";
var idItem = "";
let valorModal = 0;
let arrItem = [];
let dayWeekObj = {
  0: "<strong>Domingou</strong> no sofá😴? só que não! <br> Que tal iniciar a semana com uma bela lista de compras?",
  1: "<strong>Segunda-Feira</strong> e vai começar aquele projetinho fitness?😅 <br> Pra não esquecer nada inicie uma lista de compras abaixo!",
  2: "A <strong>terça</strong> tá com cara de segunda😁? <br> Cola com nós pra não esquecer nenhum item da lista de compras!",
  3: "<strong>Quarta-feira</strong> chefia ✌! <br> Dia propício para fazer aquelaaas compras! Clica no botão abaixo e vamos que vamos! 🏃‍♂️🏃‍♀️",
  4: "<strong>Quinta-feira</strong> com &quot;q&quot; de quase sexta🎉! <br> Pra não esquecer nada no mercado, clica abaixo e faz a listinha!",
  5: "😎 <strong> Sextouuuu!</strong> <br> Bora fazer a listinha do churras!",
  6: "<strong>Sábado</strong> também é dia 🙌!<br>Inicie uma nova lista para não esquecer nada!",
};

pMain.innerHTML = dayWeekObj[dayWeek];

//Evento click no botão 'apagar todos os itens da lista'
deleteAll.addEventListener("click", () => {
  deleteAllItems();
  renderScreen();
});

//Função principal e exclusiva para renderização dos elementos na tela
function renderScreen() {
  const items = JSON.parse(localStorage.getItem(listLocalStorage)); //Recupera os itens salvos no localStorage
  let htmlCode = "";
  let checkedValue = "";

  if (!items || items.length === 0) {
    listBox.innerHTML = ""; 
    valueTotal.innerText = "R$ 0,00";

    applyHidden(true, "render");
    return;
  } else {
    applyHidden(false, "render");
  }

  //Laço para iteração e criação dos elementos HTMLs, identificando cada elemento com seu ID e prefixo definido pela natureza do elemento
  items.forEach((item) => {
    let valueItemId = item.value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
    checkedValue = item.checked ? "checked" : ""; //checa se o campo deve estar marcado na renderização com base no valor do array
    valueItemId = item.checked ? valueItemId : ""; 
    htmlCode += `
    <li class="content input-group ${checkedValue}" id="${item.id}">
    <input type="checkbox" class="form-check-input chk" ${checkedValue} id="chk-${item.id}"/> 
    <input type="text" id="txt-${item.id} "class="lineThrough text" value="${item.text}" readOnly> 
    <span id="value-${item.id} "class="valueItem"> ${valueItemId}</span> 
    <button id="btn-${item.id}" class="delete action"><i class="fa-solid fa-trash-can"></i></button> 
    </li>`;
  });
  listBox.innerHTML = htmlCode;

  //Cria as funções em todos os 'buttons' para deletar items da lista
  var buttons = document.getElementsByClassName("delete"); // take all DOM elements buttons that have an 'remove'
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", removeItem);
  }

  //Cria as funções em todos os elementos 'span' com a descrição do item, permitindo a edição após duploclick e fazendo a edição com o focusout
  var itemText = document.getElementsByClassName("text"); 
  for (var i = 0; i < itemText.length; i++) {

    itemText[i].addEventListener("keypress", function(e){
      var id = this.getAttribute("id"); //Recupera o ID do elemento
    var text = this.value; //Recupera o texto do elemento
    id = id.replace("txt-", "");
      e.key === 'Enter' ? editItem(id,text) : '';
    }); //função focusout para alterar array/localstorage com base na descrição atualizada do elemento
    itemText[i].addEventListener("focusout", function(){
      var id = this.getAttribute("id"); //Recupera o ID do elemento
      var text = this.value; //Recupera o texto do elemento
      id = id.replace("txt-", "");
      editItem(id,text);
    }); //função focusout para alterar array/localstorage com base na descrição atualizada do elemento
    itemText[i].addEventListener("dblclick", contentEditable); //função para liberar a edição do elemento após duploclick
  }
  //Cria as funções para todos os checkboxs renderizados
  var check = document.getElementsByClassName("chk"); //
  for (var i = 0; i < buttons.length; i++) {
    check[i].addEventListener("click", boxChecked); //função para alterar o status checked do elemento no array/localstorage, assim como abrir modal para informar valores
  }
  //Por fim, é renderizado no footer o valor atualizado dos itens 'checkeds'
  sumTotal();
}

var boxChecked = async function () {
  var parent = this.parentNode; //Obtém a referência do componente pai para inclusão das animações/alterações de background color
  var id = this.getAttribute("id"); // variável id criada para receber o id do componente 'checked'
  id = id.replace("chk-", ""); //Remove o prefixo determinado para obter o mesmo ID do array/localStorage
  idItem = id;

  this.checked ? await hiddenModal(false) : addValueArr(id, 0, false);

  //verifica itens marcados e adiciona/remove classes para animação e cor no elemento, a depender do estado.
  if (this.checked) {
    parent.classList.add("checked", "animate__animated", "animate__pulse");
    idItem = "";
  } else {
    parent.classList.remove("checked", "animate__animated", "animate__pulse");
    parent.classList.add("noChecked");
    idItem = "";
  }
};

//Função chamada para permitir a edição do item com o duploclick no elemento
var contentEditable = function () {
  this.classList.add("editable")
  const addAttributte = this.readOnly = false;
  this.focus();
};

//Atualiza o conteúdo no Array/LocalStorage ao sair do campo
var editItem = function (idItem, textItem) {

  arrItem = getList(); //Atualiza o array

  let result = arrItem.filter(function (el) {
    return el.id == idItem; //Filtra o array conforme o ID do elemento
  });

  for (let element of result) {
    let index = arrItem.indexOf(element);
    arrItem[index].text = textItem; //atualiza o array com informações do item editado
  }
  
  updateLocalStorage();
};

//Função para remover item do Array/Localstorage
var removeItem = function () {
  var id = this.getAttribute("id"); // Recupera o ID do elemento
  id = id.replace("btn-", ""); //Ajusta o ID para busca no array/localstorage
  arrItem = getList(); //Atualiza o array com os dados do localStorage

  let result = arrItem.filter(function (el) {
    return el.id == id; //Filtra array conforme ID do elemento
  });

  //Realiza iteração para remover os itens pelo ID
  for (let element of result) {
    let index = arrItem.indexOf(element);
    arrItem.splice(index, 1);
  }
  songEffect("trash");
  updateLocalStorage();
};

// Função para adicionar item ao array
function addItem(text, value, qtd) {
  const newID = Date.now() * Math.random();
  const itemArray = { text, checked: false, id: newID, value: value, qtd: qtd };
  arrItem.push(itemArray);
}

//Variável funcionar para obter dados do localStorage
const getList = function () {
  var getList_string = localStorage.getItem(listLocalStorage); //
  if (getList_string != null) {
    return JSON.parse(getList_string);
  }
};

//Renderizar itens na tela no load do formulário
renderScreen();

function updateLocalStorage() {
  localStorage.setItem(listLocalStorage, JSON.stringify(arrItem)); //
  renderScreen(); // Render Screen
}

// Variavel funcional para adicionar valor no  array/localstorage
var addValueArr = (idItem, valor, checkedValue) => {
  let result = arrItem.filter(function (el) {
    return el.id == idItem;
  });

  for (let element of result) {
    let index = arrItem.indexOf(element);
    arrItem[index].value = valor;
    arrItem[index].checked = checkedValue;
    !checkedValue ? (arrItem[index].value = 0) : "";
  }
  updateLocalStorage();
};

//Captura evento submit no formulário para adição de novos itens
formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();

  //Verificar se há valor no input, se não houver exibe elemento que aponta erro
  if (!inputItem.value) {
    nullInput.hidden = false;
    return;
  } else {
    nullInput.hidden = true;
  }
  addItem(inputItem.value.trim(), 0, 0); //função para adição de novos itens
  updateLocalStorage();
  inputItem.value = ""; //limpa o campo após salvar dados
  inputItem.focus(); //atualiza o foco no campo input para inserção de novos itens
});

// Função para deletar todos os itens do Array/Objeto atualizando a tela
function deleteAllItems() {
  const validateDelete = confirm(
    "Você realmente deseja deletar toda a lista de compras?"
  );

  if (validateDelete) {
    songEffect("trash");
    localStorage.clear();
    arrItem = [];
    renderScreen();
    deleteAll.hidden = true;
    deleteChecked.hidden = true;
  }
}

//função para deletar apenas itens checkados do array/localstorage ao fim renderizando a tela;
function deleteCheckeds() {
  arrItem = getList(); //

  let result = arrItem.filter(function (el) {
    return el.checked == true;
  });

  for (let element of result) {
    let index = arrItem.indexOf(element);
    arrItem.splice(index, 1);
  }
  songEffect("trash");
  updateLocalStorage();
}

//Função para soma do total com base no array atualizado pelo localstorage
function sumTotal() {
  arrItem = getList();

  let result = arrItem.filter(function (el) {
    return el.checked == true;
  });

  const accTotal = result.reduce((acc, value) => acc + value.value, 0);

  accTotal
    ? (valueTotal.innerText = accTotal.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }))
    : (valueTotal.innerText = "R$ 0,00");
}

//disparo de evento no botão para deletar itens comprados
deleteChecked.addEventListener("click", () => deleteCheckeds());

btnMain.addEventListener("click", () => applyHidden(false));

function applyHidden(value, render) {
  formSubmit.hidden = value;
  divFooter.hidden = value;
  divEmptyList.hidden = !value;
  divFooterCredits.hidden =!value;
  //ternário para exibir/remover os botões quando houver itens no array/localstorage
  render ? ((deleteAll.hidden = value), (deleteChecked.hidden = value)) : "";
}

//Função executada para valor informado no modal - ela pausa a execução da função boxchecked
async function hiddenModal(value) {
  return new Promise((resolve) => {
    let stop = false;
    errModal.hidden = !value;
    modal.style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    valueInputModal.focus();
    formModal.addEventListener("submit", (e) => {
      e.preventDefault();
      if (valueInputModal.value) {
        valorModal = parseFloat(valueInputModal.value);
        addValueArr(idItem, valorModal, true);
        songEffect("cash");
        valueInputModal.value = "";
        modal.style.display = "none";
        errModal.hidden = true;
        stop = true;
      } else {
        errModal.hidden = false;
      }

      loop();

      function loop() {
        if (stop === true) {
          resolve();
          return;
        }

        setTimeout(loop, 1000);
      }
    });
  });
}

