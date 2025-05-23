const mysql = require('mysql2');

// Creem la connexió a la base de dades utilitzant variables d'entorn o valors per defecte.
// Aquest enfocament és útil per adaptar-se fàcilment a diferents entorns (producció, desenvolupament, etc.)
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'mysql-service',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'Hola123.',
    database: process.env.MYSQL_DATABASE || 'gestor_horaris',
    connectionLimit: 10,
    connectTimeout: 30000
});

// Intentem establir la connexió amb la base de dades
db.connect((err) => {
    if (err) {
        console.error('Error connectant a la base de dades:', err);
        return;
    }
    console.log('✅ Connectat a la base de dades!');
});

// Gestionem errors de connexió actius durant l'execució
db.on('error', (err) => {
    console.error('Error de connexió a MySQL:', err);

    // Si la connexió es perd, s'intenta reconnectar automàticament
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Reintentant connexió...');
        db.connect();
    } else {
        throw err;
    }
});

// Exportem l'objecte de connexió per fer-lo servir a altres mòduls
module.exports = db;
