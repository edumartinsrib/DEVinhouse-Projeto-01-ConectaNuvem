
import { formSubmit, divFooter, divEmptyList, listBox, sumTotal, listLocalStorage, deleteAll, deleteChecked} from "./app.js";
import { boxChecked, contentEditable, editItem, removeItem } from "./Items.js";


//Função principal e exclusiva para renderização dos elementos na tela
export function renderScreen() {
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
      check[i].addEventListener("click", boxChecked(this)); //função para alterar o status checked do elemento no array/localstorage, assim como abrir modal para informar valores
      console.log("renderScreen ~ this", this)
    }
  
    //Por fim, é renderizado no footer o valor atualizado dos itens 'checkeds'
    sumTotal();
  }
  

 export function applyHidden(value) {
    formSubmit.hidden = value;
    divFooter.hidden = value;
    divEmptyList.hidden = !value;
  }