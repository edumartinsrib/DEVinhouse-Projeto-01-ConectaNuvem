//Get Elementes
const inputItem = document.getElementById("newItemInput");
const formSubmit = document.getElementById("newItemForm");
const listBox = document.getElementById('items');

const arrItem = [];

//Listener Events
formSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  const valueInput = inputItem.value.trim();

  if (valueInput) {
    const newID = addItem(valueInput, 0, 0);
    newItem(valueInput, newID);
    inputItem.value = "";
    inputItem.focus();
    createBtnEventListener();
    createCheckEventListener();
  }
});

//delete item array/element html by id
function deleteById(array, id) {
  try {
    let element = document.getElementById(id);
    let result = array.filter(function (el) {
      return el.id == id;
    });

    for (let elemento of result) {
      let index = array.indexOf(elemento);
      array.splice(index, 1);
    }

    element.remove(); //delete element html

  } catch (erro) {

  } finally {
    updateStorage(); //Update Local Storage
  }
}




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
}

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

function renderScreen(){
    let listItems = localStorage.getItem("listShop");
    if (listItems === null) {
      arrItem = [];
    } else {
      arrItem = JSON.parse(listItems);
    }
    let htmlCode = "";
    arrItem.forEach((list, ind) => {
      htmlCode += `
      <div class="content animate__animated animate__fadeIn" name="${ind}">
    <input type="checkbox" class="form-check-input chk" id="${ind}"/> <label for="${ind}" class="lineThrough itemList"> ${list}</label> 
  </div>
  <div class="actions">
    <button name="${ind}" class="delete fa-solid fa-trash-can">X</button>
  </div>  `;
    });
    listBox.innerHTML = htmlCode;
   }


//Add Item in Array
function addItem(text, value, qtd) {
  const newID = Date.now() * Math.random();
  const itemArray = { text, checked: false, id: newID, value: value, qtd: qtd };
  arrItem.push(itemArray);
  return newID;
}

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
