const db = require('../config/database');

const getDomain = (email) => email.split('@')[1];

// READ - Listar APENAS membros do mesmo domínio
const getAllMembers = async (req, res) => {
    try {
        const userEmail = req.user.email; // Vem do token (authMiddleware)
        const domain = getDomain(userEmail);

        // Filtra onde o email termina com "@dominio_do_usuario"
        const result = await db.query(
            'SELECT * FROM funcionarios WHERE email_institucional LIKE ?', 
            [`%@${domain}`]
        );
        
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar equipa." });
    }
};

// CREATE - Adicionar membro (Força o mesmo domínio)
const addMember = async (req, res) => {
    const { nome, cargo, email, telefone } = req.body;
    const userDomain = getDomain(req.user.email);
    const newMemberDomain = getDomain(email);

    // Validação de Segurança: Impede adicionar alguém de outra empresa
    if (userDomain !== newMemberDomain) {
        return res.status(403).json({ 
            message: `Só pode adicionar membros do domínio @${userDomain}` 
        });
    }

    try {
        const sql = 'INSERT INTO funcionarios (nome, cargo, email_institucional, telefone) VALUES (?, ?, ?, ?)';
        await db.execute(sql, [nome, cargo, email, telefone]);
        res.status(201).json({ message: "Membro adicionado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao adicionar. Verifique se o email já existe." });
    }
};

// UPDATE - Atualizar membro
const updateMember = async (req, res) => {
    const { id } = req.params;
    const { nome, cargo, email, telefone } = req.body;

    try {
        const sql = 'UPDATE funcionarios SET nome = ?, cargo = ?, email_institucional = ?, telefone = ? WHERE id = ?';
        await db.execute(sql, [nome, cargo, email, telefone, id]);
        res.json({ message: "Membro atualizado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar membro." });
    }
};

const deleteMember = async (req, res) => {
    const { id } = req.params;
    // Opcional: Verificar se o ID pertence ao domínio antes de apagar
    try {
        const sql = 'DELETE FROM funcionarios WHERE id = ?'; 
        await db.execute(sql, [id]);
        res.json({ message: "Membro removido com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover." });
    }
};

module.exports = { getAllMembers, addMember, updateMember, deleteMember };