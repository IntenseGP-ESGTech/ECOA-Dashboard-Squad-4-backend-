const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Caminho para o arquivo do banco de dados
const dbPath = path.resolve(__dirname, 'database', 'cadastro.sqlite');
// Caminho para o script SQL
const schemaPath = path.resolve(__dirname, 'database', 'schema-sqlite.sql');

// Conecta ao banco (cria o arquivo se não existir)
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao criar o banco de dados", err.message);
        return;
    }
    console.log("Banco de dados SQLite conectado/criado em 'database/cadastro.sqlite'");

    // Lê o arquivo schema.sql
    fs.readFile(schemaPath, 'utf8', (err, sql) => {
        if (err) {
            console.error("Erro ao ler o arquivo schema-sqlite.sql", err);
            return;
        }

        // Executa todo o conteúdo do arquivo SQL de uma vez
        db.exec(sql, (err) => {
            if (err) {
                console.error("Erro ao executar o schema:", err.message);
            } else {
                console.log("Tabelas criadas com sucesso!");
            }

            // Fecha a conexão com o banco
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                }
                console.log('Conexão com o banco de dados fechada.');
            });
        });
    });
});