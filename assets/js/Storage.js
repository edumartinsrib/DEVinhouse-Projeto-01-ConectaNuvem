import {adicionaItem, listaItens} from './app.js'

//função para salvar o array de produtos no local storage
export function salvarStorage() {
  const listItems = listaItens.querySelectorAll("li");
  const listaDeItem = [];

  for (let item of listItems) {
    let itemTexto = item.innerText;
   // itemTexto = itemTexto.replace("Apagar", "");
    listaDeItem.push(itemTexto);
  }

  const itensJSON = JSON.stringify(listaDeItem);
  localStorage.setItem("ListadeCompras", itensJSON);
}

//função para carregar os itens salvos no localStorage
export function loadItens() {
  const itens = localStorage.getItem("ListadeCompras");

  if (itens === "[]") {
    return;
  }

  const listadeItens = JSON.parse(itens);

  for (let item of listadeItens) {
    adicionaItem(item);
  }
}
