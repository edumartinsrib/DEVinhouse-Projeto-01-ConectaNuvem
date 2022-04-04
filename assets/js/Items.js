class Items{
    constructor(name, id, qtd, valor){
        this._name = name;
        this._id = `item-${new Date().getTime()}`;
        this._qtd = qtd;
        this._valor = valor;
    }



}