import { renderScreen } from "./renderScreen.js";
import { addItem, addValueArr } from "./Items.js";
import { applyHidden } from "./renderScreen.js";
import { getArray, clearArray, updateArray} from "./dataArray.js";

/* Captura dos elementos do HTML */

const btnMain = document.getElementById("btnMain");
const pMain = document.getElementById("msgMain");

const modal = document.getElementById("myModal");
export const btnModal = document.getElementById("myBtn");
export const spanModal = document.getElementById("itemModal");

const valueInputModal = document.getElementById("valueInputModal");
const valueBtnModal = document.getElementById("valueBtnModal");

const inputItem = document.getElementById("newItemInput");
export const formSubmit = document.getElementById("newItemForm");
export const listBox = document.getElementById("items");
export const deleteAll = document.getElementById("deleteAll");
export const deleteChecked = document.getElementById("deleteChecked");
const nullInput = document.querySelector(".hidden");
const valueTotal = document.getElementById("valueTotal");

export const divEmptyList = document.getElementById("emptyList");
export const divFooter = document.getElementById("footer");



//Define Variáveis globais
var idItem = "";
let valorModal = 0;
const arrItem2 = [];


export const listLocalStorage = "listShop";


onLoadHtml();

function onLoadHtml() {
  const dayWeek = new Date().getDay();

  let dayWeekObj = {
    0: "Domingou no sofá😴? só que não! <br> Que tal iniciar a semana com uma bela lista de compras?",
    1: "Uma ótima Segunda-Feira pra começar aquele projetinho fitness 😅! <br> Pra não esquecer nada inicie uma lista de compras abaixo!",
    2: "A terça tá com cara de segunda😁? <br> Cola com nós pra não esquecer nenhum item da lista de compras!",
    3: "Quarta-feira chefia ✌! <br> Dia propício para fazer aquelaaas compras! Clica no botão abaixo e vamos que vamos! 🏃‍♂️🏃‍♀️",
    4: "Quinta-feira com &quot;q&quot; de quase sexta🎉! <br> Pra não esquecer nada no mercado, clica abaixo e faz a listinha!",
    5: "😎 Sextouuuu meu consagrado(a)! <br> Bora fazer a listinha do churras!",
    6: "Sábado também é dia 🙌!  Inicie uma nova lista para não esquecer nada!",
  };

  pMain.innerHTML = dayWeekObj[dayWeek];
  //Renderizar itens na tela no load do formulário
  renderScreen();
}

//Evento click no botão 'apagar todos os itens da lista'
deleteAll.addEventListener("click", () => {
  deleteAllItems();
  renderScreen();
});



//Captura o click no modal e realiza a atualização do valor do item no array/LocalStorage
valueBtnModal.addEventListener("click", () => {
  if (valueInputModal.value) {
    valorModal = parseFloat(valueInputModal.value);
    addValueArr(idItem, valorModal);
    valueInputModal.value = "";
    modal.style.display = "none";
  } else {
    return alert("Para prosseguir é necessário informar o valor do item!");
  }
});


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
  clearArray();
  renderScreen();
  deleteAll.hidden = true;
  deleteChecked.hidden = true;
}

//função para deletar apenas itens checkados do array/localstorage ao fim renderizando a tela;
function deleteCheckeds() {
  arrItem2 = getList(); //

  let result = arrItem2.filter(function (el) {
    return el.checked == true;
  });

  for (let element of result) {
    let index = arrItem2.indexOf(element);
    arrItem2.splice(index, 1);
  }

  localStorage.setItem(listLocalStorage, JSON.stringify(arrItem2)); //
  renderScreen(); // Render Screen
}

//Função para soma do total com base no array atualizado pelo localstorage
export function sumTotal() {
  arrItem2 = getList();

  let result = arrItem2.filter(function (el) {
    return el.checked == true;
  });

  updateArray(arrItem2);

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
