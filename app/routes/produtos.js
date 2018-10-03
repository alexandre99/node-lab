module.exports = function (app) {
    app.get('/produtos', function (req, res) {

        const connection = app.infra.connectionFactory();
        const produtoDAO = new app.infra.ProdutosDAO(connection);

        produtoDAO.lista(function (err, results) {
            if (err) {
                console.log(err.message);
            } else {
                res.render('produtos/lista', { lista: results.rows });
            }
            connection.end();
        })
    });

    app.get('/form', function (req, res) {
        res.render('produtos/form');
    });

    app.post('/produtos/salva', function (req, res) {
        const produto = req.body;

        console.log(produto);

        const connection = app.infra.connectionFactory();
        const produtoDAO = new app.infra.ProdutosDAO(connection);

        produtoDAO.salva(produto, function (erros, resultados) {
            res.render('produtos/lista');
        });
    });
};
