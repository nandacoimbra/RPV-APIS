const express = require('express');
const api = express();
const porta = 80;

// Chave da API
const KEY = 'chave12345';

function autenticarAPIKey(req, res, next) {
    // Verifica a chave de API no cabeçalho
    const apiKey = req.headers['api-key']; 

    console.log("API KEY: " + apiKey);

    if (apiKey && apiKey === KEY) {
        // Se a chave de API for válida, vá para a próxima rota
        next(); 
    } else {
        res.status(401).json({
            mensagem: "acesso nao autorizado",
            cod_status: 401
        });
    }
}

// Rota protegida
api.get('/', autenticarAPIKey, (req, res) => {
    res.status(200).json({
        mensagem: "acesso autorizado",
        cod_status: 200
    });
});

api.listen(porta, () => {
    console.log(`Servidor em execução na porta ${porta}`);
});


// ********* EXERCÍCIO 29/08 ************
// const express = require('express')
// const api = express()
// const porta = 80

// api.get('/', (req, res) => {

//     const rotaPadrao = 
//     {
//         nome_rota: '/',
//         codigo_status: '200',
//         metodo: 'GET'
//     }

//     res.status(200)
//     res.json(rotaPadrao)
// })

// // Cria usuarios
// api.post('/clientes/novo', (req, res) => {

//     const response = [
//         {
//             mensagem: 'Cliente criado com sucesso',
//             status: 201
//         }
//     ]

//     res.status(201)
//     res.json(response)
// })

// // Atualiza cliente por cpf
// api.put('/cliente/update/cpfcnpj/12345678901', (req, res) => {

//     const response = [
//         {
//             mensagem: 'Dados atualizados com sucesso',
//             status: 200
//         }
//     ]

//     res.status(200)
//     res.json(response)
// })

// // Deleta cliente por cpf
// api.delete('/cliente/delete/cpfcnpj/12345678901', (req, res) => {

//     const response = [
//         {
//             mensagem: 'Cliente deletado com sucesso',
//             status: 201
//         }
//     ]

//     res.status(201)
//     res.json(response)
// })


// api.listen(porta, () => {
//     console.log(`Servidor em execução na porta ${porta}`)
// })
