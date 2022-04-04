

const newItemElement = (itemInput,idInput) => {
  const divItem = document.createElement("div");
  divItem.classList.add("item");
  divItem.innerHTML = `
  <div class="content">
    <input type="checkbox" name="${idInput}"/> <label for="${idInput}" class="lineThrough itemList"> ${itemInput}</label> 
  </div>
  <div class="actions">
    <button class="edit">Editar</button>
    <button class="delete">Apagar</button>
  </div>   
  `;
  return divItem;
};


let arrItem = [];

function addItem(text, value, qtd){
  const itemArray = {text, checked: false, id: Date.now(), value: 0, qtd: 0} 
  arrItem.push(itemArray);
  console.log(arrItem);
}




function newItem(itemInput) {
  addItem(itemInput,0,0)
  const addItemElement = newItemElement(itemInput,itemInput);
  
  document.getElementById("items").appendChild(addItemElement);
}


function updateStorage() {
  const itensJSON = JSON.stringify(arrItem);
  localStorage.setItem("listShop", itensJSON);

}


newItem("Cebola");
newItem("Alho");
newItem("Manjericão");

updateStorage();