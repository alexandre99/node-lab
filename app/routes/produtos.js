module.exports = function (app) {

    var listaProdutos = function (req, res) {
        const connection = app.infra.connectionFactory();
        const produtoDAO = new app.infra.ProdutosDAO(connection);

        produtoDAO.lista(function (err, results) {
            if (err) {
                console.log(err.message);
            } else {
                res.render('produtos/lista', { lista: results.rows });
            }
            connection.end();
        });
    }

    app.get('/produtos', listaProdutos);

    app.get('/produtos/form', function (req, res) {
        res.render('produtos/form');
    });

    app.post('/produtos', function (req, res) {
        const produto = req.body;

        const connection = app.infra.connectionFactory();
        const produtoDAO = new app.infra.ProdutosDAO(connection);

        produtoDAO.salva(produto, function (erros, resultados) {
            connection.end();
            res.redirect('/produtos');
        });
    });
};
