// libs/mysql.js

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '15.206.128.214',
  user: 'root',
  password: '',
  database: 'gcl',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
