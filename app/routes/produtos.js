module.exports = function (app) {

    var listaProdutos = function (req, res, next) {
        const connection = app.infra.connectionFactory();
        const produtoDAO = new app.infra.ProdutosDAO(connection);

        produtoDAO.lista(function (err, results) {
            if (err) {
                return next(erros);
            } else {
                devolverListaProdutos(res, results);
            }
            connection.end();
        });
    }

    var devolverListaProdutos = (res, results) => {
        res.format({
            html: function () {
                res.render('produtos/lista', { lista: results.rows });
            },
            json: function () {
                res.json(results.rows);
            }
        });
    };

    app.get('/produtos', listaProdutos);

    app.get('/produtos/form', function (req, res) {
        devolverDadosInvalido(res, {}, {});
    });

    app.post('/produtos', function (req, res) {
        const produto = req.body;

        req.assert('titulo', 'Titulo é obrigatório').notEmpty();
        req.assert('preco', 'Formato inválido').isFloat();

        var erros = req.validationErrors();

        if (erros) {
            devolverDadosInvalido(res, erros, produto);
            return;
        }

        const connection = app.infra.connectionFactory();
        const produtoDAO = new app.infra.ProdutosDAO(connection);

        produtoDAO.salva(produto, function (erros, resultados) {
            connection.end();
            res.redirect('/produtos');
        });
    });

    var devolverDadosInvalido = (res, erros, objetoValidado) => {
        res.format({
            html: function () {
                res.status(400).render('produtos/form', { errosValidacao: erros, produto: objetoValidado });
            },
            json: function () {
                res.status(400).json(erros);
            }
        });
    }
};
