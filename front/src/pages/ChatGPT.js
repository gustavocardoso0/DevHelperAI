import React, { useState, useEffect } from 'react';
import { ScrollPanel } from 'primereact/scrollpanel';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../App.css';

function ChatGPT() {
    const [userQuestion, setUserQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [history, setHistory] = useState([]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendQuestion();
        }
    };

    const handleQuestionChange = (e) => {
        setUserQuestion(e.target.value);
    };

    const handleSendQuestion = async () => {
        if (userQuestion.trim() === '') return;

        try {
            const res = await fetch('http://localhost:4000/pergunte-ao-chatgpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: userQuestion })
            });

            const data = await res.json();
            setResponse(data.completion);
            fetchHistory(); // Atualizar histórico após enviar a pergunta
        } catch (error) {
            console.error('Erro ao enviar a pergunta:', error);
        }
    };

    const fetchHistory = async () => {
        try {
            const res = await fetch('http://localhost:4000/historico');
            const data = await res.json();
            setHistory(Array.isArray(data) ? data : []);
            console.log(data);
        } catch (error) {
            console.error('Erro ao buscar o histórico:', error);
            setHistory([]); // Define `history` como um array vazio em caso de erro
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <div>
            <NavBar />
            <div className="container my-4 min-vw-100 my-5 text-center">
                <span  className=' fs-3 fw-bold my-5 mb-4 mt-4 p-3 text-dark text-bg-light rounded widthTitle badge border-black border-3'>
                    Estude com o ChatGPT
                </span >   
                <br/>
                <div className="row justify-content-md-center">
                    
                    <aside className="col-md-3 mb-5 ">
                        <div className="card p-4 md-5 mb-5 my-5 ">
                        <span style={{ width: '100%'}} 
                              className='titulo2 fs-6 fw-bold text-dark text-dark-emphasis rounded badge '>
                        Histórico de Perguntas<br/> e Respostas:
                        </span > 
                            <hr />  
                            <ScrollPanel style={{ width: '100%', height: '300px' }} className="custombar2">
                                <ul>
                                    {history.map((item) => (
                                        <div key={item.id_pergunta}>
                                           <div class="bg-success-subtle card text-success-emphasis" role="alert">
                                                <strong className="labelPerguntaHistorico card-header">Resposta:</strong>
                                                <span className="p-1 conteudoRetornado">{item.resposta}</span>
                                                <p className="dataPergunta">{item.data_pergunta}</p>
                                            </div>
                                            <br/>
                                            <div class="bg-primary-subtle card text-primary-emphasis" role="alert">   
                                                <strong className="labelPerguntaHistorico card-header">Pergunta:</strong>
                                                <span className="p-1 conteudoRetornado">{item.pergunta}</span>
                                                <p className="dataPergunta">{item.data_pergunta}</p>
                                            </div> 
                                            <br/>
                                        </div>
                                    ))}
                                </ul>
                            </ScrollPanel>
                        </div>
                    </aside>

                    <main className="col-md-6 ">
                        <article className="card mb-5 my-5">
                            <div className="p-5 fw-bold text-dark-emphasis bg-body border border-dark-subtle rounded-3">
                                <h5>Resposta do ChatGPT:</h5>
                                {response && (
                                    <ScrollPanel style={{ width: '100%', height: 'auto' }} className="custombar1">
                                        <p>{response}</p>
                                    </ScrollPanel>
                                )}
                                <div className="input-group mt-3">
                                    <input
                                        type="text"
                                        className="input-group-prepend form-control"
                                        placeholder="Digite a sua pergunta..."
                                        value={userQuestion}
                                        onChange={handleQuestionChange}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <button id="btnEnviarPergunta" className="p-inputgroup-addon btn bg-verde" type="button" onClick={handleSendQuestion}>Enviar</button>
                                </div>
                            </div>
                        </article>
                    </main>
                </div>
            </div>
            <div className='footer'>
                <Footer />
            </div>
        </div>
    );
}

export default ChatGPT;
