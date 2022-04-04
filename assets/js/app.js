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
  }
});

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

    //delete element html
    element.remove();
  } catch (erro) {}
}

function createBtnEventListener() {
  //get all ".btn" elements in array format
  let btnDel = document.querySelectorAll(".delete");
  for (let item of btnDel) {
    item.addEventListener("click", () => {
      deleteById(arrItem, item.name);
    });
  }
}



const newItemElement = (itemInput, idInput) => {
  const divItem = document.createElement("div");
  divItem.classList.add("item");
  divItem.setAttribute("id", idInput);
  divItem.innerHTML = `
  <div class="content animate__animated animate__fadeIn" name="${idInput}">
    <input type="checkbox" class="form-check-input" name="${idInput}"/> <label for="${idInput}" class="lineThrough itemList"> ${itemInput}</label> 
  </div>
  <div class="actions">

    <button name="${idInput}" class="delete fa-solid fa-trash-can">X</button>
  </div>   
  `;
  return divItem;
};

function addItem(text, value, qtd) {
  const newID = Date.now() * Math.random();
  const itemArray = { text, checked: false, id: newID, value: value, qtd: qtd };
  arrItem.push(itemArray);
  return newID;
}

function newItem(itemInput, id) {
  const addItemElement = newItemElement(itemInput, id);
  document.getElementById("items").appendChild(addItemElement);
  updateStorage();
}

function updateStorage() {
  const itensJSON = JSON.stringify(arrItem);
  localStorage.setItem("listShop", itensJSON);
}


