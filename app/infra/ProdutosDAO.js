function ProdutosDAO(connection) {
    this._connection = connection;
}

ProdutosDAO.prototype.lista = function (callback) {
    this._connection.connect();
    this._connection.query('select * from livros', callback);
}

ProdutosDAO.prototype.salva = function (produto, callback) {
    this._connection.connect();
    const query = {
        text: 'INSERT INTO livros(titulo, descricao, preco) VALUES ($1, $2, $3)',
        values: [produto.titulo, produto.descricao, produto.preco],
    }
    this._connection.query(query, callback);
}

module.exports = function () {
    return ProdutosDAO;
}