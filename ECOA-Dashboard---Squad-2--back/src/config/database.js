const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '..', '..', 'database', 'cadastro.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao abrir o banco de dados:", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite.");
        db.run('PRAGMA foreign_keys = ON;');
    }
});

const database = {
    // Método para INSERT, UPDATE, DELETE (usa db.run)
    execute: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    console.error('Erro ao executar:', sql, params);
                    reject(err);
                } else {
                    resolve([{ insertId: this.lastID }]);
                }
            });
        });
    },

    // NOVO MÉTODO PARA BUSCAR DADOS (SELECT) (usa db.all)
    query: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if (err) {
                    console.error('Erro na query:', sql, params);
                    reject(err);
                } else {
                    // Retorna as linhas encontradas, no formato que o controller espera
                    resolve([rows]);
                }
            });
        });
    }
};

module.exports = database;