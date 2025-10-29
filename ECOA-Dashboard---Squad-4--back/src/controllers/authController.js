const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

const userTables = [
    { table: 'empresas', emailColumn: 'email_corporativo' },
    { table: 'funcionarios', emailColumn: 'email_institucional' },
    { table: 'representantes', emailColumn: 'email_institucional' },
    // Adicione a tabela de filiais aqui se elas tiverem um campo de email para login
];

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
    }

    try {
        let user = null;
        let userType = null;

        for (const { table, emailColumn } of userTables) {
            const sql = `SELECT * FROM ${table} WHERE ${emailColumn} = ?`;
            
            
            const [rows] = await db.query(sql, [email]);

            if (rows.length > 0) {
                user = rows[0];
                userType = table;
                break;
            }
        }

        if (!user) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        const isPasswordCorrect = await bcrypt.compare(senha, user.senha_hash);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        const token = jwt.sign(
            { id: user.id, email: user[user.emailColumn] || email, type: userType },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({ message: 'Login bem-sucedido!', token });

    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

module.exports = { login };