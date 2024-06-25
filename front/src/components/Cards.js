import React from 'react'

const Cards = (props) => {
  return (
    <div className='col-md-4 mb-4 d-flex justify-content-center'>
      <div className='card' style={{ width: '250px' }}>
        <img 
          style={{ width: '180px', height: '180px', objectFit: 'cover', borderRadius: '50%', margin: '10px auto' }} 
          src={props.foto} 
          className='card-img-top' 
          alt={props.name} 
        />
        <div className='card-body text-center'>
          <h5 className="card-title">{props.name}</h5>
          <p className='card-text'>{props.funcao}</p>
          <p className="card-text"><small className="text-body-secondary">RA: {props.registroAluno}</small></p>
        </div>
      </div>
    </div>
  )
}

export default Cards