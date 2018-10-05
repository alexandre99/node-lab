var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function () {
    var app = express();

    app.use(express.static('./app/public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(expressValidator());

    //carregamento de arquivo do objeto load dentro do app
    load('routes', { cwd: 'app' })
        .then('infra')
        .into(app);

    app.use(function (req, resp, next) {
        resp.status(404).render('erros/404');
        next();
    });

    app.use(function (error, req, resp, next) {
        console.log('ambiente: ' + process.env.NODE_ENV);
        if (process.env.NODE_ENV.trim() == 'production') {
            resp.status(500).render('erros/500');
            return;
        }
        next(error);
    });


    return app;
}
