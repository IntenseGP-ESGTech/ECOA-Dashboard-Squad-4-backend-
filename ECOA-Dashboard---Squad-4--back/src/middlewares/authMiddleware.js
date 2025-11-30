const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. Tenta ir buscar o token ao cabeçalho da requisição
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    try {
        // 2. Verifica se o token é válido
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Guarda os dados do utilizador (id, email) na requisição
        next(); // Deixa passar para o controller
    } catch (error) {
        return res.status(403).json({ message: "Token inválido ou expirado." });
    }
};

module.exports = verifyToken;