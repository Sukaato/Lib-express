import mysql from 'mysql';

export const lib_express = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lib_express'
});