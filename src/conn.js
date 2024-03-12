import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'mangovx',
    database: 'WB_L_5',
    password: 'majo',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool