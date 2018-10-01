function ProdutosDAO(connection){
    this._connection = connection;
}

ProdutosDAO.prototype.lista = function(callback) {
    this._connection.connect();
    this._connection.query('select * from livros', callback);
}

module.exports = function(){
    return ProdutosDAO;
}