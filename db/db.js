const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tif_codoacodo'
})

connection.connect((err) => {
    if (err) {
        console.log('Error Conectando con la base de datos:', err)
        return
    }
    console.log('Conectado con la Base de Datos')
})

module.exports = connection