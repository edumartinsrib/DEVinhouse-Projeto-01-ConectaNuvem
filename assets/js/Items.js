import { renderScreen } from "./renderScreen.js";
import { sumTotal } from "./app.js";
import { getList } from "./dataArray.js";





//Variavel funcional com as seguintes funcionalidades: Alteração do array/localstorage com atualização do 'checked',
//inclusão de animações de movimento/alteração de cor do elemento, atualização do valor total da compra.
export function boxChecked(elemento) {
console.log("boxChecked ~ elemento", elemento)
    
   // var parent = elemento.parentNode; //Obtém a referência do componente pai para inclusão das animações/alterações de background color
  
    var id = this.getAttribute("id"); // variável id criada para receber o id do componente 'checked'
  
    id = id.replace("chk-", ""); //Remove o prefixo determinado para obter o mesmo ID do array/localStorage
  
    getList(); //Atualiza o array com base no localStorage
  
    let result = arrItem.filter(function (el) {
      return el.id == id; //filtra o array para obter um novo array apenas com o ID identificado
    });
  
    for (let element of result) {
      let index = arrItem.indexOf(element);
      arrItem[index].checked = this.checked; //altera o checked do valor do array com base no elemento marcado
      !this.checked ? (arrItem[index].value = 0) : "";
    }
  
     //altera o checked do valor do localStorage com base no elemento marcado
  
    //verifica itens marcados e adiciona/remove classes para animação e cor no elemento, a depender do estado.
    if (this.checked) {
      parent.classList.add("checked", "animate__animated", "animate__pulse");
      idItem = id;
      modal.style.display = "block";
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
  export var contentEditable = function () {
    const addAttributte = this.setAttribute("contenteditable", true);
    this.focus();
  };
  
  //Atualiza o conteúdo no Array/LocalStorage ao sair do campo
  export var editItem = function () {
    var id = this.getAttribute("id"); //Recupera o ID do elemento
    var text = this.textContent; //Recupera o texto do elemento
  
    id = id.replace("txt-", "");
    getList(); //Atualiza o array
  
   
  
    localStorage.setItem(listLocalStorage, JSON.stringify(arrItem)); //Atualiza o localstorage a partir do array editado
    renderScreen(); // Renderiza a tela com as novas informações
  };
  
  //Função para remover item do Array/Localstorage
  export var removeItem = function () {
    var id = this.getAttribute("id"); // Recupera o ID do elemento
    id = id.replace("btn-", ""); //Ajusta o ID para busca no array/localstorage
    getList(); //Atualiza o array com os dados do localStorage
  
    deleteFromArray(id);
  
    localStorage.setItem(listLocalStorage, JSON.stringify(arrItem)); //Atualiza a lista no localStorage após remoção do item
    renderScreen(); // Renderiza a tela
  };
  
  // Função para gerar novo ID e adicionar item ao array
  
  export function addItem(text, value, qtd) {
    const newID = Date.now() * Math.random();
    const itemArray = { text, checked: false, id: newID, value: value, qtd: qtd };
    arrItem.push(itemArray);
  }
  
  // Variavel funcional para adicionar valor no  array/localstorage
  export var addValueArr = (idItem, valor) => {
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