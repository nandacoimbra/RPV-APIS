import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;

app.use(bodyParser.json());

const usuarios = [{ usuario: 'admin', senha: '1234' }];

const JWT_SECRET = 'secreta123';

// Endpoint de login
app.post('/auth/login', (req, res) => {
    const { usuario, senha } = req.body;

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);

    if (usuarioEncontrado) {
        const token = jwt.sign({ usuario: usuarioEncontrado.usuario }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }
});

// Middleware para verificar o token JWT
const autenticarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Verifica se o header de autorização existe e começa com 'Bearer'
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ mensagem: 'Token ausente ou inválido' });
    }

    const token = authHeader.split(' ')[1];  // Extrai o token após 'Bearer '

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ mensagem: 'Token inválido' });
        }

        req.usuario = decoded.usuario;
        next();
    });
};

// Rota protegida - GET /produtos
app.get('/produtos', autenticarToken, (req, res) => {
    const produtos = [
        { id: 1, nome: 'Base Líquida HD', preco: '59.90' },
        { id: 2, nome: 'Máscara de Cílios Volume Máximo', preco: '34.90' },
        { id: 3, nome: 'Delineador Líquido Preto', preco: '29.90' },
        { id: 4, nome: 'Batom Matte Vermelho', preco: '19.90' },
        { id: 5, nome: 'Paleta de Sombras Neutra', preco: '49.90' },
        { id: 6, nome: 'Primer Facial', preco: '39.90' },
        { id: 7, nome: 'Iluminador Compacto', preco: '44.90' },
        { id: 8, nome: 'Pó Translúcido', preco: '25.90' },
        { id: 9, nome: 'Blush Compacto', preco: '23.90' },
        { id: 10, nome: 'Fixador de Maquiagem', preco: '27.90' },
    ];

    res.json({ produtos });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
