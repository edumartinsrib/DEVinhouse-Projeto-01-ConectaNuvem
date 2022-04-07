let arrItem = [];


export const getList = function (element) {
    var getList_string = localStorage.getItem(listLocalStorage); //
    if (getList_string != null) {
      arrItem = JSON.parse(getList_string);
    }
};

export function deleteFromArray(idItem){

    let result = arrItem.filter(function (el) {
        return el.id == id; //Filtra array conforme ID do elemento
      });
    
      //Realiza iteração para remover os itens pelo ID
      for (let element of result) {
        let index = arrItem.indexOf(element);
        arrItem.splice(index, 1);
      }
}

export function editArray(idItem){
    let result = arrItem.filter(function (el) {
        return el.id == idItem; //Filtra o array conforme o ID do elemento
      });
    
      for (let element of result) {
        let index = arrItem.indexOf(element);
        arrItem[index].text = text; //atualiza o array com informações do item editado
      }
}

export function updateStorage(){
    localStorage.setItem(listLocalStorage, JSON.stringify(arrItem));
}

export function updateArray(valor){
    arrItem = valor;
}

export function clearArray(){
    arrItem = [];
}

export let getArray = () =>{
    return arrItem
}