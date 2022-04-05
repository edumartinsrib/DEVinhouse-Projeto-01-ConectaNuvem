//Get Elementes
const inputItem = document.getElementById("newItemInput");
const formSubmit = document.getElementById("newItemForm");
const listBox = document.getElementById("items");

const arrItem = [];

let array = localStorage.getItem("listShop");
if (array){
arrItem.push = JSON.parse(array);
}


// search list in localStorange
const listJSON = localStorage.getItem("listShop");

// Verifica se tem algo no storage
/* if(listJSON){
    arrItem.fill = JSON.parse(listJSON);
    renderScreen();
} */

//Listener Events
formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(arrItem)
  
  addItem(inputItem.value.trim(), 0, 0);

  localStorage.setItem("listShop", JSON.stringify(arrItem));

  inputItem.value = "";
  inputItem.focus();
  renderScreen();
});

function renderScreen() {
  const items = JSON.parse(localStorage.getItem('listShop'));
  console.log("renderScreen ~ items", items)

  if(!items){
    return
  }
  let htmlCode = "";

  items.forEach((item) => {
    htmlCode += `
    <li class="content animate__animated animate__fadeIn" id="${item.id}">
    <input type="checkbox" class="form-check-input chk" id="${item.id}"/> <label for="${item.id}" class="lineThrough itemList"> ${item.text}</label> <button id="${item.id}" onclick='function deleteTodo(${item.id})' class="delete fa-solid fa-trash-can">X</button> 
    </li>`;
  });
  listBox.innerHTML = htmlCode; 
}

function itemDone(){

}

function deleteItems(){

}

function addItem(text, value, qtd) {
  const newID = Date.now() * Math.random();
  const itemArray = { text, checked: false, id: newID, value: value, qtd: qtd };
  arrItem.push(itemArray);
}

function deleteTodo(ind) {
  console.log("ind", ind)
  let array = localStorage.getItem("listShop");
  arrItem = JSON.parse(array);
  arrItem.splice(ind, 1);
  localStorage.setItem("listShop", JSON.stringify(arrItem));
  renderScreen();
}



//delete item array/element html by id



/* function deleteById(array, id) {
  let result = array.filter(function (el) {
    return el.id == id;
  });

  for (let element of result) {
    let index = array.indexOf(element);
    array.splice(index, 1);
  }
} */

renderScreen();
/* 



//create Event Listener in all '.btn' elements
function createBtnEventListener() {
  //get all ".btn" elements in array format
  let btnDel = document.querySelectorAll(".delete");
  for (let item of btnDel) {
    item.addEventListener("click", () => {
      deleteById(arrItem, item.name);
    });
  }
}

//create Event Listener in all '.btn' elements
function createCheckEventListener() {
  
  let checkEl = document.querySelectorAll(".chk"); //get all ".btn" elements in array format
  for (let item of checkEl) {
    item.addEventListener("click", () => {

  //Update Array/LocalStorage 
     const novoArray = arrItem.find(itens => itens.id === item.id);
     console.log("item.addEventListener ~ novoArray", novoArray)

    });
  }
} */

function idArray(array, id) {
  return array.id === id;
}

//Create new Item in HTML
/* const newItemElement = (itemInput, idInput) => {
  return `
  <div class="content animate__animated animate__fadeIn" name="${idInput}">
    <input type="checkbox" class="form-check-input chk" id="${idInput}"/> <label for="${idInput}" class="lineThrough itemList"> ${itemInput}</label> 
  </div>
  <div class="actions">

    <button name="${idInput}" class="delete fa-solid fa-trash-can">X</button>
  </div>   
  `;
}; */

//Add Item in Array

//Add Item - master function
function newItem(itemInput, id) {
  const addItemElement = newItemElement(itemInput, id);
  document.getElementById("items").appendChild(addItemElement);

  updateStorage();
}

//update the local storage
function updateStorage() {
  const itensJSON = JSON.stringify(arrItem);
  localStorage.setItem("listShop", itensJSON);
}
