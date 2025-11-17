const express = require('express');
const passport = require('../config/passportGoogle');
const jwt = require('jsonwebtoken');

const router = express.Router();

// INÍCIO do login Google
router.get(
    '/',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// CALLBACK do Google
router.get(
    '/callback',
    passport.authenticate('google', { failureRedirect: '/auth/google/failure' }),
    (req, res) => {

        const user = req.user;
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            message: "Login com Google realizado com sucesso!",
            token,
            user
        });
    }
);

router.get('/failure', (req, res) => {
    res.status(401).json({ message: "Falha ao autenticar com o Google." });
});

module.exports = router;
