import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'dev',
    password: 'dev',
    database: 'Lib_express',
    connectionLimit: 5
});

export const database = pool.promise();