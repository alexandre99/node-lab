module.exports = function (app) {
    app.get('/promocoes/form', function (res, resp) {
        const connection = app.infra.connectionFactory();
        const produtoDAO = new app.infra.ProdutosDAO(connection);

        produtoDAO.lista(function (err, results) {
            if (err) {
                return next(erros);
            } else {
                resp.render('promocoes/form', { lista: results.rows });
            }
            connection.end();
        });
    });

    app.post('/promocoes', function (req, resp) {
        var promocao = req.body;
        app.get('io').emit('novaPromocao',promocao);
        resp.redirect('/promocoes/form');
    });
};