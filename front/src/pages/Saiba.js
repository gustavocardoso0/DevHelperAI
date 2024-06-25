import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Cards from '../components/Cards'
import '../App.css'

function Saiba() {

  /* Adicione os integrantes no elemento abaixo */
  const integrantes = {
    dadosIntegrantes: [
      {
        name: 'Felipe Magalhães de Araujo Carneiro',
        funcao: 'Desenvolvedor Full-stack',
        registroAluno: '823119685',
        foto: 'https://avatars.githubusercontent.com/u/111382377?v=4https://media.licdn.com/dms/image/sync/D4D27AQEarNu0KEDG_g/articleshare-shrink_480/0/1712862278930?e=1718060400&v=beta&t=mcwbimiL7SAoS12epxTU9777D8oTBTPJsCiSr7qElNo'
      },
      {
        name: 'Murilo Matos Bernardo',
        funcao: 'Desenvolvedor Full-stack',
        registroAluno: '823132278',
        foto: 'https://avatars.githubusercontent.com/u/94113139?v=4'
      },
      {
        name: 'Fadel Abbas Mzannar',
        funcao: 'Desenvolvedor Front-End',
        registroAluno: '823155706',
        foto: 'https://avatars.githubusercontent.com/u/164114940?s=400&u=ccd587380b8c236d4730b2b03f134e38f79eb0db&v=4'
      },
      {
        name: 'Gustavo Evangelista Cardoso',
        funcao: 'Desenvolvedor Front-End',
        registroAluno: '823129532',
        foto: 'https://avatars.githubusercontent.com/u/107882018?v=4'
      },
      {
        name: 'Felipe Soares Lima',
        funcao: 'Desenvolvedor Front-End',
        registroAluno: '823127421',
        foto: 'https://avatars.githubusercontent.com/u/165835933?v=4'
      },
      {
        name: 'Analice Souza de Almeida Silva',
        funcao: 'Desenvolvedor Front-End',
        registroAluno: '823115451',
        foto: 'https://avatars.githubusercontent.com/u/165851141?v=4'
      },
      {
        name: 'Lucas Cezar Alcala Zenteno',
        funcao: 'Desenvolvedor Front-End ',
        registroAluno: '823144811',
        foto: 'https://avatars.githubusercontent.com/u/125783397?v=4'
      },



    ]
  }

  return (
    <div>
      <NavBar />

      <main className='container my-4 min-vw-100'>
        <div className='container text-center'>


          <p className="badge fs-2 fw-bold my-4 mb-5 mt-5 p-3 text-dark text-bg-light rounded widthTitle">Integrantes do grupo</p>

          {/* Card Murilo */}
          <div className="row">
            {integrantes.dadosIntegrantes.map((integrante, index) => (

              <Cards
                key={index}
                name={integrante.name}
                funcao={integrante.funcao}
                registroAluno={integrante.registroAluno}
                foto={integrante.foto}
              />
            ))}
          </div>


        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Saiba
