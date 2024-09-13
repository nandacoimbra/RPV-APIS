const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = 'chave-secreta-123'; // Substitua por uma chave secreta forte e segura

// Lista de usuários fictícios para autenticação
const users = [
    { id: 1, username: 'fernanda', password: '123456' },
    { id: 2, username: 'admin', password: 'admin123' }
];

// Função auxiliar para gerar o JWT
const generateToken = (userId) => {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 3600; // Expira em 1 hora

    const token = jwt.sign({ userId, iat, exp }, SECRET_KEY);
    return { token, iat, exp };
};

// 1. Endpoint de Login (Autenticação) - /jwt/auth
app.post('/jwt/auth', (req, res) => {
    const { username, password } = req.body;

    // Verificação simples de usuário e senha
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerar o token JWT
    const { token, iat, exp } = generateToken(user.id);

    return res.json({
        token_id: token,
        iat: new Date(iat * 1000).toISOString(),
        exp: new Date(exp * 1000).toISOString()
    });
});

// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
};

// 2. Endpoint Protegido (Autorização) - /jwt/produtos
app.get('/jwt/produtos', verifyToken, (req, res) => {
    const produtos = [
        { id: 1, nome: 'Produto A', preco: 100 },
        { id: 2, nome: 'Produto B', preco: 200 },
        { id: 3, nome: 'Produto C', preco: 300 }
    ];

    return res.json(produtos);
});

// Inicializa o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
