const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = 'sua_chave_secreta_aqui'; // Substitua pela sua chave secreta

// Rota para gerar JWT
app.post('/jwt/auth', (req, res) => {
  const user = {
    username: 'user',
    senha: '123456'
  };

  // Gera um token JWT com duração de 1 hora
  const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // O token vem no formato "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Rota protegida que retorna a lista de métodos HTTP
app.get('/jwt/metodosHttp', verifyToken, (req, res) => {
  const metodosHttp = {
    get: {
      "objetivo_principal": "Recuperar dados",
      "limite_caracteres": "Sem limite",
      "aceita_https": "Sim",
      "aceita_http": "Sim",
    },
    post: {
      "objetivo_principal": "Enviar dados",
      "limite_caracteres": "Varia",
      "aceita_https": "Sim",
      "aceita_http": "Sim",
    },
    put: {
      "objetivo_principal": "Atualizar dados inteiramente",
      "limite_caracteres": "Varia",
      "aceita_https": "Sim",
      "aceita_http": "Sim",
    },
    patch: {
      "objetivo_principal": "Atualizar dados parcialmente",
      "limite_caracteres": "Varia",
      "aceita_https": "Sim",
      "aceita_http": "Sim",
    },
    delete: {
      "objetivo_principal": "Remover dados",
      "limite_caracteres": "Varia",
      "aceita_https": "Sim",
      "aceita_http": "Sim",
    },
  };

  res.json(metodosHttp);
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
