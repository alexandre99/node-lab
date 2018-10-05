const { Client } = require('pg');
function createDBConnection() {

    if (!process.env.NODE_ENV || process.env.node === 'dev') {
        return new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'casadocodigo_nodejsdd',
            password: 'regina12',
            port: 5432
        });
    }

    if (process.env.NODE_ENV.trim() == 'test') {
        return new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'casadocodigo_nodejs_test',
            password: 'regina12',
            port: 5432
        });
    }
};

module.exports = function () {
    return createDBConnection;
}