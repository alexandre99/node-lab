const {Client} = require('pg');
function createDBConnection () {
    const client =  new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'casadocodigo_nodejs',
        password: 'regina12',
        port: 5432
    });
    
    return client;
};

module.exports = function() {
    return createDBConnection;
}