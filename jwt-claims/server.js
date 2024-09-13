const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Chave secreta para assinar o JWT
const secretKey = "mysecretkey12377";

// Configurações para o token JWT (tempo de expiração, etc.)
const jwtOptions = {
  expiresIn: '1h',
};

// 1. Rota para listar todas as JWT Claims
app.get('/jwt/claims', (req, res) => {
  const claims = {
    iss: 'Issuer (Emissor) - Identifica quem emitiu o token',
    sub: 'Subject (Assunto) - O assunto do token, pode ser o ID do usuário',
    aud: 'Audience (Audiência) - Destina-se a quem o token é dirigido',
    exp: 'Expiration Time - Quando o token expira',
    nbf: 'Not Before - Quando o token passa a ser válido',
    iat: 'Issued At - Data de emissão do token',
    jti: 'JWT ID - Um identificador único para o token',
  };
  res.json(claims);
});

// 2. Rota para criar um JWT com claims de ID, data de geração e expiração
app.get('/jwt/tokenid', (req, res) => {
  const payload = {
    id: 123, // Pode ser o ID do usuário, por exemplo
    iat: Math.floor(Date.now() / 1000), // Data de geração (Issued At)
  };

  // Gerar o token JWT
  const token = jwt.sign(payload, secretKey, jwtOptions);

  res.json({
    message: 'Token gerado com sucesso!',
    token: token,
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
