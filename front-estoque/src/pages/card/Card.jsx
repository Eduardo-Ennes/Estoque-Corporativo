import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import '../../app.css'

function Card() {

  const [Card, setCard] = useState([])

  return (
    <>
      {Card.length > 0 ? (
        <div className='div-card'>
          <div className='div-card-contein'>
            <p className='div-card-contein-p-name'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, vero!</p>
            <div className='div-card-contein-spanqtd-and-price'>
              <span className='span-card-qtd'><Link className='Link-span-qtd'>-</Link><p>10</p><Link className='Link-span-qtd'>+</Link></span>
              <p className='div-card-contein-price'>R$250.000,00</p>
            </div>
          </div>
        </div>
      ):(
        <div className='div-card'>
          <h1 className='H1-title-card-payments-empty'>Carrinho vazio!</h1>
        </div>
      )}
      
      <div className='div-card-payments'>
        <span className='div-card-span-payments'>
          <p>Total:</p>
          <p>R$1.000,00</p>
        </span>
        <Link className='Link-card-payments'>Fechar Pedido</Link>
      </div>
    </>
  )
}

export default Card