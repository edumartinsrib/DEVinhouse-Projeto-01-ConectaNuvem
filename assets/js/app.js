//Get Elementes
const inputItem = document.getElementById("newItemInput");
const formSubmit = document.getElementById("newItemForm");

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

  } finally{
    updateStorage(); //Update Local Storage
  }
}

//Update Array/LocalStorage 
function updateById(array, id){
  
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
  //get all ".btn" elements in array format
  let checkEl = document.querySelectorAll(".chk");
  for (let item of checkEl) {
    item.addEventListener("click", () => {
      updateById(arrItem, item.id);
    });
  }
}

//Create new Item in HTML
const newItemElement = (itemInput, idInput) => {
  const divItem = document.createElement("div");
  divItem.classList.add("item");
  divItem.setAttribute("id", idInput);
  divItem.innerHTML = `
  <div class="content animate__animated animate__fadeIn" name="${idInput}">
    <input type="checkbox" class="form-check-input chk" id="${idInput}"/> <label for="${idInput}" class="lineThrough itemList"> ${itemInput}</label> 
  </div>
  <div class="actions">

    <button name="${idInput}" class="delete fa-solid fa-trash-can">X</button>
  </div>   
  `; 
  return divItem;
};

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
