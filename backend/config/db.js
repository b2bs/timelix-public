const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'mysql-service', // Canvi de 'localhost' a 'mysql-service'
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'Hola123.',
    database: process.env.MYSQL_DATABASE || 'gestor_horaris',
    connectionLimit: 10,
    connectTimeout: 30000
});

db.connect((err) => {
    if (err) {
        console.error('Error connectant a la base de dades:', err);
        return;
    }
    console.log('✅ Connectat a la base de dades!');
});

db.on('error', (err) => {
    console.error('Error de connexió a MySQL:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Reintentant connexió...');
        db.connect();
    } else {
        throw err;
    }
});

module.exports = db;
