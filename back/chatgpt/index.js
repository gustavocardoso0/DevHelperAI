require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; //Obtém a chave da API do OpenAI do arquivo .env
const { OpenAI } = require('openai'); //Importa a biblioteca OpenAI
const openai = new OpenAI(OPENAI_API_KEY); // Inicializa a instância do OpenAI com a chave da API

const express = require('express'); //Importa o framework Express.
const cors = require('cors'); //Importa o middleware CORS para permitir requisições entre diferentes origens.
const mysql = require('mysql2'); // Importa a biblioteca MySQL2 para interagir com o banco de dados MySQL.

const app = express();
app.use(express.json()); //Usa middleware para processar requisições com corpo em JSON
app.use(cors());

// Cada variável fica acessível como uma propriedade do objeto process.env
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env

//Cria um pool de conexões com o banco de dados com configurações específicas
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

// Define um endpoint POST para fazer perguntas ao ChatGPT.
app.post('/pergunte-ao-chatgpt', async (req, res) => {
    const { prompt } = req.body
    const role = "user"
    const max_tokens = 200 //Controla o número de caracteres e será alterado pelo 'limit_response'
    const model = 'gpt-3.5-turbo' // Versão do ChatGPT
    const limit_response = 'Sou um estudante de programação novato, para o seguinte texto, elabore uma resposta com no máximo 200 caractéres de forma clara para um leigo' // Criado para mandar uma mensagem ao OpenAI Obs.: que não é obrigatorio mas definirá o perfil do usuário e o texto tenha o tamanho certo.

    // Faz a solicitação à API do OpenAI.:
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: role, content: `${limit_response}: "${prompt}"` }],
            model: model,
            max_tokens: max_tokens
        });

        //Extrai a resposta do OpenAI.
        const responseText = completion.choices[0].message.content; //

        //Armazena a pergunta no banco de dados
        pool.query('INSERT INTO tb_perguntas (pergunta) VALUES (?)', [prompt], (err, results) => {
            if (err) throw err;

            //Obtém o ID da pergunta inserida
            const perguntaId = results.insertId;
            //Armazena a resposta no banco de dados
            pool.query('INSERT INTO tb_respostas (id_pergunta, resposta) VALUES (?, ?)', [perguntaId, responseText], (err) => {
                if (err) throw err;
            });
        });

        res.json({ completion: responseText });
    } catch (error) {
        console.error('Erro na solicitação ao OpenAI:', error);
        res.status(500).json({ error: 'Erro ao gerar resposta!' });
    }
});

//Define um endpoint GET para obter o histórico de perguntas e respostas.
app.get('/historico', (req, res) => {
    const sql = `
    SELECT p.id_pergunta,
           p.pergunta,
           r.resposta,
           DATE_FORMAT(p.data_pergunta, '%d/%m/%Y %H:%i:%s') AS data_pergunta
      FROM tb_perguntas p
      LEFT JOIN tb_respostas r
      ON p.id_pergunta = r.id_pergunta
      ORDER BY p.id_pergunta DESC`; //Define a query SQL para buscar as perguntas e respostas

    //Executa a query SQL e retorna os resultados como JSON.
    pool.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});

//Inicializa o servidor na porta 4000
app.listen(4000, () => console.log("ChatGPT_Beckend em execução na porta 4000."));