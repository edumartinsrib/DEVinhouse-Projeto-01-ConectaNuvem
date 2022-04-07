/* Captura dos elementos do HTML */

const btnMain = document.getElementById("btnMain");
const pMain = document.getElementById("msgMain");

const modal = document.getElementById("myModal");
const btnModal = document.getElementById("myBtn");
const spanModal = document.getElementById("itemModal");
const errModal = document.getElementById("errModal");

const valueInputModal = document.getElementById("valueInputModal");
const valueBtnModal = document.getElementById("valueBtnModal");

const inputItem = document.getElementById("newItemInput");
const formSubmit = document.getElementById("newItemForm");
const listBox = document.getElementById("items");
const deleteAll = document.getElementById("deleteAll");
const deleteChecked = document.getElementById("deleteChecked");
const nullInput = document.querySelector(".hidden");
const valueTotal = document.getElementById("valueTotal");

const divEmptyList = document.getElementById("emptyList");
const divFooter = document.getElementById("footer");

//Define Variáveis globais
const dayWeek = new Date().getDay();
const listLocalStorage = "listShop";
var idItem = "";
let valorModal = 0;
let arrItem = [];

let dayWeekObj = {
  0: "Domingou no sofá😴? só que não! <br> Que tal iniciar a semana com uma bela lista de compras?",
  1: "Uma ótima Segunda-Feira pra começar aquele projetinho fitness 😅! <br> Pra não esquecer nada inicie uma lista de compras abaixo!",
  2: "A terça tá com cara de segunda😁? <br> Cola com nós pra não esquecer nenhum item da lista de compras!",
  3: "Quarta-feira chefia ✌! <br> Dia propício para fazer aquelaaas compras! Clica no botão abaixo e vamos que vamos! 🏃‍♂️🏃‍♀️",
  4: "Quinta-feira com &quot;q&quot; de quase sexta🎉! <br> Pra não esquecer nada no mercado, clica abaixo e faz a listinha!",
  5: "😎 Sextouuuu! <br> Bora fazer a listinha do churras!",
  6: "Sábado também é dia 🙌!  Inicie uma nova lista para não esquecer nada!",
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
  let htmlCode = ""; //variável que conterá o código HTML após iteração
  let checkedValue = ""; //Variável para guardar o valor checked true/false na iteração

  if (!items || items.length === 0) {
    listBox.innerHTML = ""; //Se não houver nada salvo, não ocorre a renderização de elementos
    valueTotal.innerText = "R$ 0,00";
    deleteAll.hidden = true; //se não há valores no array esconde os botões de delete
    deleteChecked.hidden = true;
    applyHidden(true);
    return;
  } else {
    deleteAll.hidden = false; //se  há valores no array exibe os botões de delete
    deleteChecked.hidden = false;
    applyHidden(false);
  }

  //Laço para iteração e criação dos elementos HTMLs, identificando cada elemento com seu ID e prefixo definido pela natureza do elemento
  items.forEach((item) => {
    let valueItemId = item.value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
    checkedValue = item.checked ? "checked" : ""; //checa se o campo deve estar marcado na renderização com base no valor do array
    valueItemId = item.checked ? valueItemId : ""; //chega se o campo não está marcado não traz o valor do item na renderização
    htmlCode += `
    <li class="content input-group ${checkedValue}" id="${item.id}">
    <input type="checkbox" class="form-check-input chk" ${checkedValue} id="chk-${item.id}"/> 
    <span id="txt-${item.id} "class="lineThrough text itemList"> ${item.text}</span> 
    <span id="value-${item.id} "class="valueItem"> ${valueItemId}</span> 
    <button id="btn-${item.id}" class="delete action"><i class="fa-solid fa-trash-can"></i></button> 
    </li>`;
  });
  listBox.innerHTML = htmlCode; //renderiza os componentes na tela <i class="fa-solid fa-circle-trash"></i>

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

  sumTotal();
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
    !this.checked ? (arrItem[index].value = 0) : "";
  }

  localStorage.setItem(listLocalStorage, JSON.stringify(arrItem)); //altera o checked do valor do localStorage com base no elemento marcado
  errModal.hidden = true;

  //verifica itens marcados e adiciona/remove classes para animação e cor no elemento, a depender do estado.
  if (this.checked) {
    parent.classList.add("checked", "animate__animated", "animate__pulse");
    idItem = id;
    modal.style.display = "block";
    valueInputModal.focus();
  } else {
    parent.classList.remove("checked", "animate__animated", "animate__pulse");
    parent.classList.add("noChecked");

    //realiza a atualização do valor total em tela - é reexecutada a função, pois para os efeitos de animação ocorrerem, a tela não pode ser renderizada novamente
    sumTotal();
    //limpa o iD para o caso de um novo item ser marcado
    idItem = "";
  }
  //
  //
};

//Função chamada para permitir a edição do item com o duploclick no elemento
var contentEditable = function () {
  const addAttributte = this.setAttribute("contenteditable", true);
  this.focus();
};

//Atualiza o conteúdo no Array/LocalStorage ao sair do campo
var editItem = function () {
  var id = this.getAttribute("id"); //Recupera o ID do elemento
  var text = this.textContent; //Recupera o texto do elemento

  id = id.replace("txt-", "");
  arrItem = getList(); //Atualiza o array

  let result = arrItem.filter(function (el) {
    return el.id == id; //Filtra o array conforme o ID do elemento
  });

  for (let element of result) {
    let index = arrItem.indexOf(element);
    arrItem[index].text = text; //atualiza o array com informações do item editado
  }

  localStorage.setItem(listLocalStorage, JSON.stringify(arrItem)); //Atualiza o localstorage a partir do array editado
  renderScreen(); // Renderiza a tela com as novas informações
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

  localStorage.setItem(listLocalStorage, JSON.stringify(arrItem)); //Atualiza a lista no localStorage após remoção do item
  renderScreen(); // Renderiza a tela
};

// Função para gerar novo ID e adicionar item ao array

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

//Captura o click no modal e realiza a atualização do valor do item no array/LocalStorage
valueBtnModal.addEventListener("click", () => {
  if (valueInputModal.value) {
    valorModal = parseFloat(valueInputModal.value);
    addValueArr(idItem, valorModal);
    valueInputModal.value = "";
    modal.style.display = "none";
    errModal.hidden = true;
  } else {
    errModal.hidden = false;
  }
});

// Variavel funcional para adicionar valor no  array/localstorage
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
  localStorage.setItem(listLocalStorage, JSON.stringify(arrItem)); //atualiza localstorage com informações do array
  inputItem.value = ""; //limpa o campo após salvar dados
  inputItem.focus(); //atualiza o foco no campo input para inserção de novos itens
  renderScreen(); //renderiza a tela com itens adicionados
});

// Função para deletar todos os itens do Array/Objeto atualizando a tela
function deleteAllItems() {
  localStorage.clear();
  arrItem = [];
  renderScreen();
  deleteAll.hidden = true;
  deleteChecked.hidden = true;
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

  localStorage.setItem(listLocalStorage, JSON.stringify(arrItem)); //
  renderScreen(); // Render Screen
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

function applyHidden(value) {
  formSubmit.hidden = value;
  divFooter.hidden = value;
  divEmptyList.hidden = !value;
}
