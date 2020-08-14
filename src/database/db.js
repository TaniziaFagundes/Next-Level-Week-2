const Database= require('sqlite-async')

function execute(db){
    //criar as tabelas do banco de dados
    return db.exec(` 
    
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes(
            id INTEGER PRIMARY  KEY AUTOINCREMENT,
            subject INTERGER,
            cust TEXT,
            proffy_id INTEGER 
        );

        CREATE TABLE IF NOT EXISTS class_schedule(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );

    `) //NÃO SÃO ASPAS'', SÃO CRASES ``
}

//module.exports serve para exporta o database para outro file com require. (vide no file teste.js)
module.exports = Database.open(__dirname + '/database.sqlite').then(execute)