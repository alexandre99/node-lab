var express = require('../config/express')();
var request = require('supertest')(express);
describe('#ProdutosController', function () {

    beforeEach(function (done) {
        var conn = express.infra.connectionFactory();
        conn.connect();
        conn.query('delete from livros', function (err) {
            if (!err) {
                conn.end();
                done();
            }
        });
    });

    it('#listagem json', function (done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('#cadastro de novo produto com dados invalidos', function (done) {
        request.post('/produtos')
            .send({ titulo: "", descricao: "novo livro" })
            .expect(400, done);
    });

    it('#cadastro de novo produto com dados validos', function (done) {
        request.post('/produtos')
            .send({ titulo: "titulo", descricao: "novo livro", preco: 20.50 })
            .expect(200, done);
    });

});