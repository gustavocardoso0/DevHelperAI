require('dotenv').config()
const cors = require('cors')
const express = require('express')
//mysql é o nome de uma variável, pode ser qualquer coisa
//mysql parece mais intuitivo do que mysql2
const mysql = require('mysql2')
const app = express()
app.use(express.json())
app.use(cors());

// Cada variável fica acessível como uma propriedade do objeto process.env
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env

// Criacao de um Pool de conexoes
const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    //se todas as conexões estiverem ocupadas, novos solicitantes esperam numa fila
    //se configurado com false, causa um erro quando recebe requisições e todas
    //as conexões estão ocupadas
    waitForConnections: true,
    //no máximo 10 conexões. Elas são abertas sob demanda e não no momento de
    //construção do pool
    connectionLimit: 10,
    //quantos solicitantes podem aguardar na fila? 0 significa que não há limite
    queueLimit: 0
    
})

// Endpoint para buscar perguntas e respostas
app.get('/perguntas', (req, res) => {
    const sql = `
        SELECT p.id_pergunta, p.pergunta, r.resposta
        FROM tb_perguntas p
        LEFT JOIN tb_respostas r ON p.id_pergunta = r.id_pergunta
    `;
    pool.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar perguntas e respostas' });
        } else {
            res.json(results);
        }
    });
});


const porta = 3000
app.listen(porta, () => console.log(`API com MySQL - Executando. Porta ${porta}`))