
const Pool = require('pg').Pool;

const pool = new Pool ({
    user: 'postgres',
    host: 'arrival.cloudority.com',
    databse: 'ocm_db',
    password: 'passwordrm',
    port: '5432'
});


module.exports = pool;