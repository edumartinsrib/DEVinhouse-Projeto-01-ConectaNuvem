
import {salvarStorage, loadItens} from './Storage.js'

// Declaração dos campos
const btnAdd = document.getElementById("btnAddItem");
const iptItem = document.getElementById("iptItem");
const iptQtd = document.getElementById("iptQtd");
export const listaItens = document.getElementById("listaUl");



//Função para criar Itens da Lista
function criaLi() {
    const li = document.createElement("li"); //cria o elemento LI
    li.setAttribute("name", "LI"); //atribui o nome LI ao elemento criado
    return li; //retorna o elemento na função para o adiciona item
  }
  
  //Função para adicionar itens na lista
export function adicionaItem(nomeProduto, qtdProduto) {
    const li = criaLi(); //Retorna o LI criado
  
    li.innerHTML = `${nomeProduto} - ${qtdProduto}`; //Dados do input vão preencher o innerhtml do LI criado anteriormente
    console.log("adicionaItem ~ criaLi", li)
    
  
    
    listaItens.appendChild(li); //Adiciona o LI como filho do UL (listaItens)
    limpaInput(); //Limpa o Campo Input após inclusão do item
   // botaoDeletarItem(li); //Inclui o botão 'apagar' nos items LI's criados
    salvarStorage(); //Salva-Atualiza o LocalStorage
  };
  
  //função para limpar input e ajustar foco no input
function limpaInput() {
    iptItem.value = "";
    iptItem.focus();
  }

  btnAdd.addEventListener('click', () => {
    iptItem.value ? adicionaItem(iptItem.value, iptQtd.value) : alert('Campo item não pode estar em branco!')

  });

  /*
function botaoDeletarItem(li) {
    li.innerHTML += " ";
    const botaoDeletar = document.createElement("button");
    botaoDeletar.innerHTML = "Apagar";
    botaoDeletar.setAttribute("class", "apagar btn");
    li.appendChild(botaoDeletar);
  }
  */

  loadItens()